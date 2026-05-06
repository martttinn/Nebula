import { HeroParticles } from "./particles";
import { HeroLead } from "./lead";
import { GridScanShell } from "./grid-scan-shell";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-nebula-void">
      <GridScanShell className="opacity-[0.82]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_24%_32%,rgba(83,74,183,0.2),transparent_34%),linear-gradient(180deg,rgba(9,9,15,0.18)_0%,rgba(9,9,15,0.42)_42%,rgba(9,9,15,0.94)_78%,rgba(9,9,15,1)_100%)]" />
      <HeroParticles />

      <div className="section-shell relative z-10 flex min-h-screen items-center justify-center pt-28 pb-16 text-center sm:pt-32">
        <HeroLead />
      </div>
    </section>
  );
}
