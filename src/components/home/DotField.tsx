'use client';

import { useEffect, useRef } from 'react';

const SPACING = 30;
const RADIUS = 210;
const PURPLE_THRESHOLD = 0.72;

// Cores da malha em cada tema: no claro, pontos escuros e o roxo oficial da Oxygeni.
const PALETTES = {
  dark: { base: 'rgba(230, 234, 237, 0.13)', blue: [26, 115, 233], purple: [168, 114, 255] },
  light: { base: 'rgba(14, 27, 43, 0.14)', blue: [26, 115, 233], purple: [123, 44, 255] },
};

const currentPalette = () =>
  document.documentElement.dataset.theme === 'dark' ? PALETTES.dark : PALETTES.light;
const COMPACT_WIDTH = 760;

// Caminho do foco de luz quando não há cursor. Em telas estreitas o texto ocupa toda a
// largura, então o foco fica na parte de baixo do painel para não passar atrás da leitura.
const idleFocus = (time: number, width: number, height: number) =>
  width < COMPACT_WIDTH
    ? {
        x: width * (0.5 + 0.38 * Math.sin(time / 3400)),
        y: height * (0.95 + 0.05 * Math.cos(time / 2600)),
      }
    : {
        x: width * (0.68 + 0.2 * Math.sin(time / 3400)),
        y: height * (0.45 + 0.28 * Math.cos(time / 2600)),
      };

// Substitui o antigo efeito 3D: uma malha discreta de pontos que acende perto do cursor.
// Sem cursor, um foco de luz percorre a malha devagar. Só anima enquanto está visível.
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const panel = canvas?.parentElement;
    if (!canvas || !context || !panel) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let pointer: { x: number; y: number } | null = null;
    let palette = currentPalette();
    const focus = idleFocus(0, panel.clientWidth, panel.clientHeight);

    const drawStill = () => {
      const still = idleFocus(0, width, height);
      draw(still.x, still.y);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = panel.clientWidth;
      height = panel.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion) drawStill();
    };

    function draw(focusX: number, focusY: number) {
      context!.clearRect(0, 0, width, height);

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const glow = Math.max(0, 1 - Math.hypot(x - focusX, y - focusY) / RADIUS);
          const eased = glow * glow;
          const [r, g, b] = glow > PURPLE_THRESHOLD ? palette.purple : palette.blue;

          context!.beginPath();
          context!.fillStyle =
            eased > 0.01 ? `rgba(${r}, ${g}, ${b}, ${0.2 + eased * 0.8})` : palette.base;
          context!.arc(x, y, 1.1 + eased * 1.5, 0, Math.PI * 2);
          context!.fill();
        }
      }
    }

    const animate = (time: number) => {
      const target = pointer ?? idleFocus(time, width, height);

      focus.x += (target.x - focus.x) * 0.08;
      focus.y += (target.y - focus.y) * 0.08;

      draw(focus.x, focus.y);
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frame && visible && !document.hidden && !reducedMotion) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = panel.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const onPointerLeave = () => {
      pointer = null;
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(panel);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    visibilityObserver.observe(panel);

    // Ao trocar o tema, a malha troca de cores na hora (e é redesenhada se estiver parada).
    const themeObserver = new MutationObserver(() => {
      palette = currentPalette();
      if (reducedMotion) drawStill();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    panel.addEventListener('pointermove', onPointerMove);
    panel.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      panel.removeEventListener('pointermove', onPointerMove);
      panel.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
