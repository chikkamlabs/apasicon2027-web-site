'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Pulse {
  id: number;
  x: number;
  y: number;
}

interface BgAuraProps {
  /** Show the decorative flowing ribbons. Turn off for short strips (e.g. countdown). */
  waves?: boolean;
}

export default function BgAura({ waves = true }: BgAuraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef({ x: -500, y: -500 });
  const idRef = useRef(0);

  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const isInside = (event: PointerEvent, rect: DOMRect) =>
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    const updatePosition = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      if (!isInside(event, rect)) {
        glow.style.opacity = '0';
        return;
      }

      positionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = positionRef.current;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        glow.style.opacity = '1';
        rafRef.current = null;
      });
    };

    const hideGlow = () => {
      glow.style.opacity = '0';
    };

    // Tap: one soft glow that blooms and fades. No rings, no waves.
    const createPulse = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!isInside(event, rect)) return;

      if (
        event.target instanceof Element &&
        event.target.closest('a, button, input, textarea, select')
      ) {
        return;
      }

      const pulse: Pulse = {
        id: ++idRef.current,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      setPulses((previous) => [...previous.slice(-3), pulse]);
    };

    window.addEventListener('pointermove', updatePosition, { passive: true });
    window.addEventListener('pointerdown', createPulse);
    window.addEventListener('blur', hideGlow);

    return () => {
      window.removeEventListener('pointermove', updatePosition);
      window.removeEventListener('pointerdown', createPulse);
      window.removeEventListener('blur', hideGlow);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#fbfaf7]"
    >
      {/* Warm ivory glass base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(255,255,255,0.98),transparent_45%),radial-gradient(ellipse_at_90%_15%,rgba(255,222,148,0.42),transparent_45%),radial-gradient(ellipse_at_50%_85%,rgba(235,222,204,0.52),transparent_55%)]" />

      {/* Large diffused light sources */}
      <div className="absolute -left-[15%] top-[5%] h-64 w-[70%] rotate-[-18deg] rounded-[100%] bg-amber-100/70 blur-[90px]" />
      <div className="absolute -right-[15%] top-[15%] h-64 w-[65%] rounded-[100%] bg-yellow-200/50 blur-[100px]" />
      <div className="absolute left-[15%] bottom-[-20%] h-72 w-[75%] rounded-[100%] bg-orange-100/50 blur-[100px]" />

      {/* Fluid glass ribbons (decorative) */}
      {waves && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="glassGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff3c7" stopOpacity=".1" />
              <stop offset="25%" stopColor="#e9bd58" stopOpacity=".7" />
              <stop offset="48%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#f5d36f" stopOpacity=".85" />
              <stop offset="100%" stopColor="#fff4cf" stopOpacity=".15" />
            </linearGradient>

            <linearGradient id="glassMist" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
              <stop offset="50%" stopColor="#f8e9c8" stopOpacity=".18" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity=".65" />
            </linearGradient>

            <filter id="glassGlow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          <path
            d="M-100 330 C150 225 230 125 470 100 C690 78 850 175 1080 125 C1240 90 1350 25 1540 -35"
            stroke="url(#glassGold)"
            strokeWidth="34"
            opacity=".48"
            filter="url(#glassGlow)"
          />
          <path
            d="M-100 330 C150 225 230 125 470 100 C690 78 850 175 1080 125 C1240 90 1350 25 1540 -35"
            stroke="url(#glassMist)"
            strokeWidth="2"
          />

          <path
            d="M-100 445 C130 545 350 555 580 555 C820 555 965 515 1120 425 C1260 345 1360 300 1540 335"
            stroke="url(#glassGold)"
            strokeWidth="45"
            opacity=".5"
            filter="url(#glassGlow)"
          />
          <path
            d="M-100 445 C130 545 350 555 580 555 C820 555 965 515 1120 425 C1260 345 1360 300 1540 335"
            stroke="#ffffff"
            strokeWidth="2.5"
            opacity=".95"
          />
          <path
            d="M-100 460 C130 560 350 570 580 568 C820 565 970 530 1125 440 C1265 360 1365 315 1540 350"
            stroke="url(#glassGold)"
            strokeWidth="1.5"
            opacity=".9"
          />

          <path
            d="M-100 690 C180 790 350 655 570 625 C800 595 980 650 1180 570 C1330 510 1410 445 1540 460"
            stroke="url(#glassGold)"
            strokeWidth="34"
            opacity=".38"
            filter="url(#glassGlow)"
          />
          <path
            d="M-100 690 C180 790 350 655 570 625 C800 595 980 650 1180 570 C1330 510 1410 445 1540 460"
            stroke="url(#glassMist)"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* Moving cursor glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full"
        style={{
          opacity: 0,
          transform: 'translate3d(-500px,-500px,0)',
          background:
            'radial-gradient(circle, rgba(255,218,126,0.38) 0%, rgba(255,231,177,0.24) 28%, rgba(255,255,255,0.12) 48%, transparent 72%)',
          filter: 'blur(18px)',
          mixBlendMode: 'multiply',
          willChange: 'transform, opacity',
          transition: 'opacity 250ms ease',
        }}
      />

      {/* Tap: a single soft glow that fades out smoothly */}
      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className="absolute"
          style={{ left: pulse.x, top: pulse.y }}
        >
          <span
            className="soft-pulse"
            onAnimationEnd={() =>
              setPulses((previous) => previous.filter((item) => item.id !== pulse.id))
            }
          />
        </div>
      ))}

      {/* Subtle frosted-glass finish */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.25), transparent 45%, rgba(255,255,255,0.16))',
        }}
      />

      <style jsx>{`
        .soft-pulse {
          position: absolute;
          left: 0;
          top: 0;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 222, 140, 0.55) 0%,
            rgba(255, 236, 190, 0.3) 40%,
            transparent 70%
          );
          filter: blur(10px);
          animation: soft-bloom 900ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }

        @keyframes soft-bloom {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.85;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .soft-pulse {
            animation-duration: 0.3s;
          }
        }
      `}</style>
    </div>
  );
}