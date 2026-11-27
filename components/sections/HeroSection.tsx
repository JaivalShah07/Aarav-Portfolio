
import Link from "next/link";
import { GenerativeLinefield } from "@/components/hero/GenerativeLinefield";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden py-16 pb-36 sm:py-24"
    >
      <GenerativeLinefield />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start max-w-4xl">
          <h1
            id="hero-heading"
            className="text-6xl sm:text-8xl lg:text-[8.5rem] font-bold tracking-tight leading-[0.98] select-none text-foreground"
          >
            Aarav Vyas
          </h1>

          <p className="text-5xl sm:text-7xl lg:text-[4.5rem] font-light italic font-serif text-secondary mt-1 sm:mt-1.5 leading-[1.05]">
            I make ideas work on the web
            <span className="text-accent-gold not-italic font-sans font-normal ml-1">
              .
            </span>
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-background bg-foreground px-6 py-3 rounded-sm transition-colors duration-150 hover:bg-foreground/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>Explore work</span>
              <svg
                className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3.333 8h9.334M8.667 4l4 4-4 4" />
              </svg>
            </Link>

            <Link
              href="#home"
              className="inline-flex items-center text-sm font-medium text-secondary hover:text-foreground px-4 py-3 transition-colors duration-150 active:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10 px-6 sm:px-10 lg:px-12 pb-7 sm:pb-9">
        <div className="w-full mx-auto border-t border-border/50 pt-5 sm:pt-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] font-medium text-secondary/60 uppercase">
                Interests
              </span>
              <span className="text-[11px] sm:text-sm text-secondary leading-relaxed">
                Technology  ·  Design  ·  Innovation
              </span>
            </div>

            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] font-medium text-secondary/60 uppercase">
                Location
              </span>
              <span className="text-[11px] sm:text-sm text-secondary">
                India
              </span>
            </div>

            <div className="flex flex-col gap-2 items-end text-right">
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] font-medium text-secondary/60 uppercase">
                In Progress
              </span>
              <span className="text-[11px] sm:text-sm text-secondary leading-relaxed">
                Expanding Skillset
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}