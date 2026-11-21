
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  // Track active navigation section
  useEffect(() => {
    const updateActiveLink = () => {
      setActiveHref(window.location.hash || "#home");
    };

    updateActiveLink();

    window.addEventListener("hashchange", updateActiveLink);

    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, []);

  // Handle Escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Floating Minimal Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-15 lg:px-30 py-5 lg:py-10 flex items-center justify-between pointer-events-none transition-opacity duration-200 ${className}`}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="pointer-events-auto text-2xl font-sans transition-colors duration-500 hover:text-accent-grey active:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-terminal rounded-sm py-1 px-1.5"
          aria-label="Aarav Vyas"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-medium">
            AV<span className="text-accent-grey">.</span>
          </span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="fullscreen-navigation-menu"
          aria-label={
            isOpen ? "Close navigation overlay" : "Open navigation overlay"
          }
          className="pointer-events-auto group relative cursor-pointer p-2"
        >
          <div
            className="relative w-5 h-4 flex flex-col justify-between"
            aria-hidden="true"
          >
            <span
              className={`block h-[1.5px] w-full bg-foreground transition-all duration-300 ease-out ${
                isOpen
                  ? "translate-y-[7.25px] rotate-45"
                  : "translate-y-0 rotate-0"
              }`}
            />

            <span
              className={`block h-[1.5px] w-full bg-foreground transition-all duration-200 ease-out ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />

            <span
              className={`block h-[1.5px] w-full bg-foreground transition-all duration-300 ease-out ${
                isOpen
                  ? "translate-y-[-7.25px] -rotate-45"
                  : "translate-y-0 rotate-0"
              }`}
            />
          </div>
        </button>
      </header>

      {/* Full-Screen Sliding Navigation Overlay */}
      <div
        id="fullscreen-navigation-menu"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Site Navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 z-50 flex flex-col justify-between
          p-6 sm:p-10 lg:p-16
          bg-background/95 backdrop-blur-md
          transform transition-transform duration-1450
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isOpen
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-full pointer-events-none"
          }`}
      >
        {/* Close Button */}
        <div className="absolute top-6 right-10 sm:top-10 sm:right-14 lg:top-16 lg:right-20">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="group relative w-14 h-14 flex items-center justify-center
              transition-transform duration-300 hover:scale-110
              focus-visible:outline-none focus-visible:ring-1
              focus-visible:ring-accent-terminal cursor-pointer"
          >
            <div
              className="relative w-8 h-7 flex flex-col justify-between"
              aria-hidden="true"
            >
              <span
                className="block h-0.5 w-full bg-foreground
                  translate-y-3.25 rotate-45
                  transition-colors duration-300
                  group-hover:bg-accent-grey"
              />

              <span
                className="block h-0.5 w-full bg-foreground
                  -translate-y-3.25 -rotate-45
                  transition-colors duration-300
                  group-hover:bg-accent-grey"
              />
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="w-full max-w-6xl mx-auto my-auto py-12">
          <nav aria-label="Overlay Navigation">
            <ul className="flex flex-col gap-6 sm:gap-2">
              {navItems.map((item, index) => {
                const isActive = activeHref === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveHref(item.href);
                        setIsOpen(false);
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className={`group inline-flex items-center gap-5 sm:gap-7
                        rounded-sm
                        focus-visible:outline-none focus-visible:ring-1
                        focus-visible:ring-accent-terminal
                        transform transition-all duration-400
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${
                          isOpen
                            ? "translate-x-0 opacity-100"
                            : "translate-x-12 opacity-0"
                        }`}
                      style={{
                        transitionDelay: isOpen
                          ? `${350 + index * 100}ms`
                          : `${(3 - index) * 50}ms`,
                      }}
                    >
                      {/* Navigation Label */}
                      <span
                        className={`relative font-roboto text-4xl sm:text-6xl lg:text-7xl
                          tracking-tight leading-none
                          transition-colors duration-300
                          ${
                            isActive
                              ? "text-accent-grey"
                              : "text-foreground group-hover:text-accent-grey"
                          }
                          after:content-[''] after:absolute after:left-0 after:-bottom-1.25
                          after:h-0.5 after:bg-accent-grey
                          after:transition-all after:duration-300
                          ${
                            isActive
                              ? "after:w-full"
                              : "after:w-0 group-hover:after:w-full"
                          }`}
                      >
                        {item.label}
                      </span>

                      {/* Continuous Arrow */}
                      <span
                        className="inline-flex items-center
                          w-0 opacity-0 overflow-hidden
                          group-hover:w-20 group-hover:opacity-100
                          transition-all duration-500 ease-out"
                        aria-hidden="true"
                      >
                        <span className="h-[1.5px] w-15 shrink-0 bg-accent-grey" />

                        <span
                          className="w-2.5 h-2.5 shrink-0
                            border-t-[1.5px] border-r-[1.5px] 
                            border-accent-grey rotate-45 -ml-1"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Overlay Footer */}
        <div
          className="w-full max-w-6xl mx-auto pt-6
            border-t border-border/40
            flex flex-col sm:flex-row sm:items-center
            justify-between gap-4 text-xs text-secondary"
        >
          <div>
            <span>Personal studio of Aarav Vyas</span>
            <span className="mx-2 text-border">/</span>
            <span>Creative Developer</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-secondary/70">Esc to close</span>
          </div>
        </div>
      </div>
    </>
  );
}
