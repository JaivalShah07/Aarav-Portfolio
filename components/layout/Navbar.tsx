import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  return (
    <header
      className={`w-full border-b border-[#29302F]/40 bg-[#0B0D0E]/80 backdrop-blur-md sticky top-0 z-40 transition-colors ${className}`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 sm:px-10 lg:px-12">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-[#E8E7E1] transition-colors hover:text-white"
          aria-label="MIDNIGHT / BUILD Home"
        >
          <span>MIDNIGHT</span>
          <span className="text-[#929995]">/</span>
          <span className="text-[#929995] group-hover:text-[#E8E7E1] transition-colors">BUILD</span>
        </Link>

        {/* Navigation Items */}
        <nav aria-label="Primary" className="flex items-center gap-6">
          <Link
            href="#work"
            className="text-xs font-mono text-[#929995] transition-colors hover:text-[#E8E7E1] focus-visible:outline-none focus-visible:underline"
          >
            Work
          </Link>
          <Link
            href="#about"
            className="text-xs font-mono text-[#929995] transition-colors hover:text-[#E8E7E1] focus-visible:outline-none focus-visible:underline"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-xs font-mono text-[#929995] transition-colors hover:text-[#E8E7E1] focus-visible:outline-none focus-visible:underline"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
