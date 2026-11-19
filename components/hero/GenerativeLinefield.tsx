"use client";

import React, { useEffect, useRef } from "react";

export function GenerativeLinefield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer tracking with smooth damping
    const pointer = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
    };

    // State flags
    let isTabVisible = !document.hidden;
    let isIntersecting = true;
    let isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion && animId) {
        cancelAnimationFrame(animId);
        renderStatic();
      } else if (!isReducedMotion) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", handleMotionChange);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isIntersecting = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (isReducedMotion) {
        renderStatic();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    // Pointer events on container / window
    const handlePointerMove = (e: PointerEvent) => {
      if (isReducedMotion) return;
      const rect = container.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.targetX = -2000;
      pointer.targetY = -2000;
      pointer.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    let time = 0;
    let lastTime = performance.now();

    function drawLines(currentTime: number, staticMode = false) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Line field density: adapt gracefully by height
      const lineCount = Math.floor(Math.max(28, Math.min(52, height / 18)));
      const stepY = height / (lineCount - 1);
      const pointsPerLine = Math.floor(Math.max(30, Math.min(80, width / 20)));
      const stepX = width / (pointsPerLine - 1);

      const pX = pointer.x;
      const pY = pointer.y;
      const influenceRadius = 180;
      const influenceSq = influenceRadius * influenceRadius;

      ctx.lineWidth = 1;

      for (let i = 0; i < lineCount; i++) {
        const baseY = i * stepY;
        const normY = i / lineCount;

        // Depth & opacity curve: subtlest near top and bottom, clearest in mid-lower
        const baseAlpha = 0.08 + Math.sin(normY * Math.PI) * 0.12;

        ctx.beginPath();

        for (let j = 0; j < pointsPerLine; j++) {
          const baseX = j * stepX;
          let y = baseY;

          if (!staticMode) {
            // Natural harmonic wave drift (very slow, calm)
            const wave1 = Math.sin(baseX * 0.003 + currentTime * 0.5 + i * 0.18) * 7;
            const wave2 = Math.cos(baseX * 0.007 - currentTime * 0.35 + i * 0.22) * 4;
            y += wave1 + wave2;

            // Interactive displacement around pointer
            if (pointer.active || (pX > -100 && pY > -100)) {
              const dx = baseX - pX;
              const dy = y - pY;
              const distSq = dx * dx + dy * dy;

              if (distSq < influenceSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (1 - dist / influenceRadius);
                // Displace vertically with smooth cosine envelope
                const displacement = Math.sin(force * Math.PI) * 36;
                // If above cursor, push up; if below, push down
                y += (dy >= 0 ? 1 : -1) * displacement;
              }
            }
          }

          if (j === 0) {
            ctx.moveTo(baseX, y);
          } else {
            ctx.lineTo(baseX, y);
          }
        }

        // Draw line with curated stroke
        // Slightly warmer tone on every 6th line for editorial texture
        const isAccentLine = i % 7 === 0;
        if (isAccentLine) {
          ctx.strokeStyle = `rgba(196, 164, 106, ${baseAlpha * 0.85})`;
        } else {
          ctx.strokeStyle = `rgba(232, 231, 225, ${baseAlpha})`;
        }

        ctx.stroke();
      }
    }

    function renderStatic() {
      drawLines(0, true);
    }

    function loop(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isTabVisible || !isIntersecting) {
        animId = requestAnimationFrame(loop);
        return;
      }

      // Smooth pointer lag for organic elasticity
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      time += dt;

      drawLines(time, false);

      animId = requestAnimationFrame(loop);
    }

    if (isReducedMotion) {
      renderStatic();
    } else {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {/* Top & bottom gentle gradient falloffs to maintain seamless edge readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-transparent to-[#0B0D0E]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_50%_45%] from-transparent via-[#0B0D0E]/40 to-[#0B0D0E] pointer-events-none" />
    </div>
  );
}
