"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  opacity: number;
};

export function HeroBackdrop({ stableDarkGrid = false }: { stableDarkGrid?: boolean }) {
  const [time, setTime] = useState(0);
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => createParticles(), []);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    let previous = performance.now();

    function tick(now: number) {
      const elapsed = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      setTime((current) => current + elapsed);
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute inset-0 ${stableDarkGrid ? "opacity-35" : "grid-backdrop opacity-45"}`}
        style={
          stableDarkGrid
            ? {
                backgroundImage:
                  "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }
            : undefined
        }
      />
      <div className="hero-aurora absolute -inset-[18%]" />
      {particles.map((particle) => {
        const drift = reduceMotion ? 0 : Math.sin(time * 0.9 + particle.drift) * 14;

        return (
          <span
            key={particle.id}
            className="absolute rounded-full bg-signal"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              transform: `translate3d(${drift}px, ${drift * -0.45}px, 0)`,
            }}
          />
        );
      })}
    </div>
  );
}

function createParticles(): Particle[] {
  return Array.from({ length: 86 }, (_, index) => {
    const seed = index + 1;

    return {
      id: index,
      x: 3 + pseudoRandom(seed * 17) * 94,
      y: 4 + pseudoRandom(seed * 31) * 88,
      size: 1.4 + pseudoRandom(seed * 43) * 2.8,
      drift: pseudoRandom(seed * 59) * Math.PI * 2,
      opacity: 0.1 + pseudoRandom(seed * 71) * 0.24,
    };
  });
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}
