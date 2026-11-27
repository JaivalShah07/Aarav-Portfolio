
import Link from "next/link";
import { SectionSideLabels } from "../layout/SectionSideLabels";

export function AboutSection() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="relative w-full bg-[#111312] text-foreground py-20 sm:py-25 lg:py-29"
        >
            <SectionSideLabels left="ABOUT ME" right="01" />
            <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-20 xl:px-24">

                {/* Main heading */}
                <div className="max-w-5xl">
                    <h2
                        id="about-heading"
                        className="text-4xl sm:text-6xl lg:text-[5.5rem] font-semibold tracking-tight leading-[1.05]"
                    >
                        More than just
                        <br />
                        <span className="font-serif italic font-light text-secondary">
                            writing code.
                        </span>
                    </h2>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-16 sm:mt-24">

                    {/* Left introduction */}
                    <div className="lg:col-span-7">
                        <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-foreground/90 font-light">
                            I enjoy exploring ideas, solving problems, and creating
                            things that bring technology and creativity together.
                        </p>

                        <div className="mt-8 max-w-xl space-y-5">
                            <p className="text-base sm:text-[17px] leading-[1.85] text-secondary">
                                I&apos;m Aarav, a developer interested in the intersection
                                of technology, design, and problem-solving. I enjoy
                                turning ideas into meaningful digital experiences.
                            </p>

                            <p className="text-base sm:text-[17px] leading-[1.85] text-secondary">
                                Currently exploring full-stack development and
                                artificial intelligence, I&apos;m always experimenting
                                with new technologies and finding opportunities
                                to learn through building.
                            </p>
                        </div>

                        <Link
                            href="#work"
                            className="group mt-10 inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent-gold"
                        >
                            Discover what I build
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Right information */}
                    <div className="lg:col-span-5 lg:pl-10 lg:border-l border-border/50">
                        <div className="space-y-9">

                            <div>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary/50">
                                    Currently
                                </span>
                                <p className="mt-3 text-base text-foreground">
                                    Undergraduate Student
                                </p>
                            </div>

                            <div>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary/50">
                                    Areas of Interest
                                </span>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {["Full-stack Development", "Artificial Intelligence", "Creative Development"].map((item) => (
                                        <span
                                            key={item}
                                            className="border border-border/70 px-3.5 py-2.5 text-[13px] sm:text-sm text-secondary"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary/50">
                                    Approach
                                </span>
                                <p className="mt-3 text-base text-foreground">
                                    Learn. Build. Iterate.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom statement */}
                <div className="mt-28 sm:mt-36 border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between gap-4">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-secondary/50">
                        Always exploring what&apos;s next
                    </span>

                    <span className="text-sm text-secondary">
                        Curiosity keeps me moving.
                    </span>
                </div>

            </div>
        </section>
    );
}
