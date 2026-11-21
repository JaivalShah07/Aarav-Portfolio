import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />

        {/* Anchor destinations for work, about, and contact */}
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
