export function DotFieldFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-100"
      style={{
        backgroundImage: [
          "radial-gradient(circle at center, rgba(83,74,183,0.58) 0 1.2px, transparent 1.4px)",
          "linear-gradient(180deg, rgba(9,9,15,0) 0%, rgba(9,9,15,0) 52%, rgba(9,9,15,0.18) 66%, rgba(9,9,15,0.78) 84%, rgba(9,9,15,1) 100%)",
        ].join(","),
        backgroundPosition: "center center, center center",
        backgroundSize: "14px 14px, auto",
      }}
    />
  );
}
