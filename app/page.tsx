import { Hero } from "@/components/home/hero";
import { HowWeWorkSection } from "@/components/home/how-we-work";
import { ProjectsShowcaseSection } from "@/components/home/projects-showcase";
import { ServicesCarouselSection } from "@/components/home/services-carousel";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { Footer } from "@/components/layout/footer";
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
      <ProjectsShowcaseSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
