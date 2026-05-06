import { ValuePropositionStatements } from "./statements";

const VALUE_PROPOSITION_BACKGROUND =
  "radial-gradient(circle_at_78%_60%,rgba(83,74,183,0.1),transparent_30%)";

export function ValuePropositionSection() {
  return (
    <section className="relative -mt-px bg-nebula-void">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: VALUE_PROPOSITION_BACKGROUND }}
      />

      <div className="section-shell relative z-10">
        <ValuePropositionStatements />
      </div>
    </section>
  );
}
