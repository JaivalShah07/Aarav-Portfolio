
interface SectionSideLabelsProps {
  left: string;
  right: string;
}

export function SectionSideLabels({
  left,
  right,
}: SectionSideLabelsProps) {
  return (
    <>
      {/* Left label */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-5 xl:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-7"
      >
        <span className="h-16 w-px bg-border/50" />

        <span
          className="font-serif italic text-4xl xl:text-9xl font-light tracking-tight text-secondary/40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {left}
        </span>

        <span className="h-16 w-px bg-border/50" />
      </div>

      {/* Right label */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 xl:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-7"
      >
        <span className="h-16 w-px bg-border/50" />

        <span
          className="font-serif italic text-4xl xl:text-2xl font-light tracking-tight text-secondary/40 whitespace-nowrap"
        >
          {right}
        </span>

        <span className="h-16 w-px bg-border/50" />
      </div>
    </>
  );
}
