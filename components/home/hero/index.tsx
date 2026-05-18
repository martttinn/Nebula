import { HeroLead } from "./lead";
import { DotFieldShell } from "./dot-field-shell";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-nebula-void">
      <DotFieldShell
        className="opacity-100"
        dotRadius={3.5}
        dotSpacing={24}
        cursorRadius={600}
        bulgeStrength={120}
        glowRadius={180}
        waveAmplitude={4}
        gradientFrom="rgba(58,52,130,0.76)"
        gradientTo="rgba(83,74,183,0.56)"
        glowColor="rgba(9,9,15,0.78)"
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(9,9,15,0)_0%,rgba(9,9,15,0)_52%,rgba(9,9,15,0.18)_66%,rgba(9,9,15,0.78)_84%,rgba(9,9,15,1)_100%)]" />

      <div className="section-shell relative z-10 flex min-h-screen items-center justify-center pt-28 pb-16 text-center sm:pt-32">
        <HeroLead />
      </div>
    </section>
  );
}
