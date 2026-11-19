import Link from "next/link";
import { GenerativeLinefield } from "@/components/hero/GenerativeLinefield";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden py-16 sm:py-24"
    >
      {/* Signature Living Background: Continuous generative field of fine lines */}
      <GenerativeLinefield />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Developer's Full Name as Single Semantic H1 Centerpiece */}
          <h1
            id="hero-heading"
            className="tracking-tight leading-[0.98] select-none text-[#E8E7E1]"
          >
            <span className="block text-6xl sm:text-8xl lg:text-[8.5rem] font-bold tracking-tight">
              Aarav Vyas
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-[4.5rem] font-light italic font-serif text-[#929995] mt-1 sm:mt-2">
              I make ideas work on the web<span className="text-[#C4A46A] not-italic font-sans font-normal ml-1">.</span>
            </span>
          </h1>

          {/* Natural, honest developer introduction
          <p className="mt-8 sm:mt-10 text-lg sm:text-xl text-[#929995] leading-relaxed max-w-xl font-normal">
            Creative developer exploring the space between useful software,
            thoughtful interfaces, and systems that work.
          </p> */}

          {/* Understated actions with clear visual rhythm */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#0B0D0E] bg-[#E8E7E1] px-6 py-3 rounded-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8E7E1]"
            >
              <span>Explore my work</span>
              <span
                className="transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center text-sm font-medium text-[#929995] hover:text-[#E8E7E1] px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#929995]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
