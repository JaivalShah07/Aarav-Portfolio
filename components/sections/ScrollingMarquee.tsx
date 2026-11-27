"use client";

import { useEffect, useRef } from "react";

const STRIP_1_PHRASES = [
  "CREATIVE DEVELOPMENT",
  "BUILDING FOR THE WEB",
  "ARTIFICIAL INTELLIGENCE",
  "FULL-STACK DEVELOPMENT",
];

const STRIP_2_PHRASES = [
  "DESIGN",
  "PROBLEM SOLVING",
  "TECHNOLOGY",
  "CONSTANTLY LEARNING",
];

const REPEAT_COUNT = 6;

const BASE_SPEED = 38;
const MAX_BOOST = 640;
const BOOST_MULTIPLIER = 2.6;
const FRICTION = 3.0;

export function ScrollingMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);
  const set2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const strip1 = strip1Ref.current;
    const strip2 = strip2Ref.current;
    if (!container || !strip1 || !strip2) return;

    let rafId: number | null = null;
    let lastTime = performance.now();
    let scrollBoost = 0;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let isIntersecting = true;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionQuery.matches;

    let w1 = set1Ref.current ? set1Ref.current.offsetWidth : 0;
    let w2 = set2Ref.current ? set2Ref.current.offsetWidth : 0;

    let x1 = w1 > 0 ? -w1 : 0;
    let x2 = 0;

    const updateWidths = () => {
      if (set1Ref.current) {
        const newW1 = set1Ref.current.offsetWidth;
        if (newW1 > 0 && w1 > 0) {
          x1 = (x1 / w1) * newW1;
        } else if (newW1 > 0) {
          x1 = -newW1;
        }
        w1 = newW1;
      }
      if (set2Ref.current) {
        const newW2 = set2Ref.current.offsetWidth;
        if (newW2 > 0 && w2 > 0) {
          x2 = (x2 / w2) * newW2;
        }
        w2 = newW2;
      }
    };

    updateWidths();

    const handleScroll = () => {
      if (isReducedMotion) return;
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (delta > 0) {
        scrollBoost = Math.min(scrollBoost + delta * BOOST_MULTIPLIER, MAX_BOOST);
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (strip1) strip1.style.transform = "translate3d(0, 0, 0)";
        if (strip2) strip2.style.transform = "translate3d(0, 0, 0)";
      } else {
        lastTime = performance.now();
        if (!rafId && isIntersecting) {
          rafId = requestAnimationFrame(loop);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        lastTime = performance.now();
        lastScrollY = window.scrollY;
        if (!rafId && isIntersecting && !isReducedMotion) {
          rafId = requestAnimationFrame(loop);
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !isReducedMotion) {
            lastTime = performance.now();
            lastScrollY = window.scrollY;
            if (!rafId) {
              rafId = requestAnimationFrame(loop);
            }
          } else if (!isIntersecting && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      },
      { rootMargin: "150px 0px" }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      updateWidths();
    });
    if (set1Ref.current) resizeObserver.observe(set1Ref.current);
    if (set2Ref.current) resizeObserver.observe(set2Ref.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateWidths, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);

    function loop(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isIntersecting || isReducedMotion) {
        rafId = null;
        return;
      }

      if (w1 <= 0 && set1Ref.current) {
        w1 = set1Ref.current.offsetWidth;
        if (w1 > 0) x1 = -w1;
      }
      if (w2 <= 0 && set2Ref.current) {
        w2 = set2Ref.current.offsetWidth;
      }

      scrollBoost *= Math.exp(-FRICTION * dt);
      if (scrollBoost < 0.1) scrollBoost = 0;

      const currentSpeed = BASE_SPEED + scrollBoost;
      const step = currentSpeed * dt;

      if (strip1 && w1 > 0) {
        x1 += step;
        while (x1 >= 0) {
          x1 -= w1;
        }
        while (x1 < -w1) {
          x1 += w1;
        }
        strip1.style.transform = `translate3d(${x1.toFixed(2)}px, 0, 0)`;
      }

      if (strip2 && w2 > 0) {
        x2 -= step;
        while (x2 <= -w2) {
          x2 += w2;
        }
        while (x2 > 0) {
          x2 -= w2;
        }
        strip2.style.transform = `translate3d(${x2.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    }

    if (!isReducedMotion) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateWidths);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Core Capabilities and Focus Areas"
      className="relative w-full py-10 sm:py-14 overflow-hidden border-y border-border/40 bg-background"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-linear-to-r from-background to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-linear-to-l from-background to-transparent z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-3.5 sm:gap-4.5">
        <div className="overflow-hidden w-full select-none py-0.5">
          <div
            ref={strip1Ref}
            className="flex items-center shrink-0 w-max will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {Array.from({ length: REPEAT_COUNT }).map((_, setIndex) => (
              <div
                key={setIndex}
                ref={setIndex === 0 ? set1Ref : undefined}
                className="flex items-center shrink-0"
                aria-hidden={setIndex > 0 ? "true" : undefined}
              >
                {STRIP_1_PHRASES.map((phrase, phraseIndex) => (
                  <div key={phraseIndex} className="flex items-center shrink-0">
                    <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono tracking-[0.14em] text-foreground/85 uppercase border border-border/80 bg-surface/30 rounded-xs whitespace-nowrap select-none transition-colors duration-200 hover:border-accent-grey/50 hover:text-foreground">
                      {phrase}
                    </div>
                    <span
                      className="text-secondary/40 text-[10px] sm:text-xs select-none px-3 sm:px-4"
                      aria-hidden="true"
                    >
                      ✳
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full select-none py-0.5">
          <div
            ref={strip2Ref}
            className="flex items-center shrink-0 w-max will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {Array.from({ length: REPEAT_COUNT }).map((_, setIndex) => (
              <div
                key={setIndex}
                ref={setIndex === 0 ? set2Ref : undefined}
                className="flex items-center shrink-0"
                aria-hidden={setIndex > 0 ? "true" : undefined}
              >
                {STRIP_2_PHRASES.map((phrase, phraseIndex) => (
                  <div key={phraseIndex} className="flex items-center shrink-0">
                    <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono tracking-[0.14em] text-foreground/85 uppercase border border-border/80 bg-surface/30 rounded-xs whitespace-nowrap select-none transition-colors duration-200 hover:border-accent-grey/50 hover:text-foreground">
                      {phrase}
                    </div>
                    <span
                      className="text-secondary/40 text-[10px] sm:text-xs select-none px-3 sm:px-4"
                      aria-hidden="true"
                    >
                      ✳
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
