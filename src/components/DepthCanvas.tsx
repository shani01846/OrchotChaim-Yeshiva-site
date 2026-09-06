'use client';

import { useEffect, useRef } from 'react';

type DepthCanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & { className?: string };

export default function DepthCanvas({ className = '', ...rest }: DepthCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const particles: { x: number; y: number; z: number; r: number; hue: number }[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth * dpr;
      h = canvas.clientHeight * dpr;
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles.length = 0;
      const count = Math.max(12, Math.round((canvas.clientWidth * canvas.clientHeight) / 40000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          z: Math.random(),
          r: 1 + Math.random() * 3,
          hue: 38 + Math.random() * 80,
        });
      }
    }

    let pointer = { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 };

    function onPointer(e: PointerEvent) {
      pointer.x = e.clientX - canvas.getBoundingClientRect().left;
      pointer.y = e.clientY - canvas.getBoundingClientRect().top;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Parallax offset
        const ox = ((pointer.x - canvas.clientWidth / 2) / canvas.clientWidth) * (30 * (p.z - 0.5));
        const oy = ((pointer.y - canvas.clientHeight / 2) / canvas.clientHeight) * (20 * (p.z - 0.5));

        const x = p.x + ox;
        const y = p.y + oy;

        ctx.beginPath();
        const alpha = 0.12 + (p.z * 0.6);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 60%, ${alpha})`;
        ctx.arc(x, y, p.r * (0.9 + p.z), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      initParticles();
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('resize', resize);
      raf = requestAnimationFrame(draw);
    }

    start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className={`${className || ''} depth-canvas`} {...rest} />;
}
