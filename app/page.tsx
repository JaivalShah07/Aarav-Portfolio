import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";

import { ScrollingMarquee } from "@/components/sections/ScrollingMarquee";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <ScrollingMarquee />
        <AboutSection />

        <section id="work" className="sr-only">
          <h2>Work</h2>
        </section>
        <section id="about" className="sr-only">
          <h2>About</h2>
        </section>
        <section id="contact" className="sr-only">
          <h2>Contact</h2>
        </section>
      </main>
    </div>
  );
}
