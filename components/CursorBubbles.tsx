"use client";
import { useEffect, useRef } from "react";

const COUNT = 10;

export default function CursorBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const points = useRef<{ x: number; y: number }[]>(
    Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }))
  );
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (hasPointer) document.documentElement.classList.add("hide-cursor");
    return () => document.documentElement.classList.remove("hide-cursor");
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const step = () => {
      // simple trailing effect
      points.current = points.current.map((p, i) => {
        const target = i === 0 ? mouse.current : points.current[i - 1];
        return {
          x: p.x + (target.x - p.x) * 0.18,
          y: p.y + (target.y - p.y) * 0.18,
        };
      });

      const nodes = containerRef.current?.children ?? [];
      points.current.forEach((p, i) => {
        const n = nodes[i] as HTMLElement;
        if (!n) return;
        n.style.transform = `translate3d(${p.x - 6}px, ${p.y - 6}px, 0)`;
        const s = 1 - i * (1 / (COUNT * 1.5));
        n.style.opacity = `${0.9 * s}`;     // more visible
        n.style.width = `${18 * s}px`;      // bigger
        n.style.height = `${18 * s}px`;

      });

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <div
            key={i}
            className="absolute rounded-full will-change-transform"
            style={{
            backgroundColor: "rgba(234, 253, 90, 0.85)",
            boxShadow: "0 0 3px rgba(234, 253, 90, 0.6)",
            filter: "none",
            left: 0,
            top: 0
            }}
        />

      ))}
    </div>
  );
}
