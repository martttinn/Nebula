import { Hero } from "@/components/home/hero";
import { HowWeWorkSection } from "@/components/home/how-we-work";
import { ServicesCarouselSection } from "@/components/home/services-carousel";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/ui/preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <ValuePropositionSection />
      <ServicesCarouselSection />
      <HowWeWorkSection />
    </>
  );
}
