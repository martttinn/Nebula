import type { CSSProperties } from "react";

import styles from "./particles.module.css";

type HeroParticleAnchor = {
  left: string;
  top: string;
  size: number;
  opacity: number;
};

type ParticleStyle = CSSProperties & {
  "--hero-particle-life": string;
  "--hero-particle-delay": string;
  "--hero-particle-opacity": string;
  "--hero-particle-x1": string;
  "--hero-particle-y1": string;
  "--hero-particle-x2": string;
  "--hero-particle-y2": string;
  "--hero-particle-x3": string;
  "--hero-particle-y3": string;
  "--hero-particle-x4": string;
  "--hero-particle-y4": string;
  "--hero-particle-scale-0": string;
  "--hero-particle-scale-1": string;
  "--hero-particle-scale-2": string;
  "--hero-particle-scale-3": string;
  "--hero-particle-scale-4": string;
};

const particleAnchors: HeroParticleAnchor[] = [
  { left: "6%", top: "16%", size: 8, opacity: 0.36 },
  { left: "12%", top: "44%", size: 4, opacity: 0.28 },
  { left: "14%", top: "62%", size: 5, opacity: 0.3 },
  { left: "21%", top: "34%", size: 6, opacity: 0.27 },
  { left: "27%", top: "76%", size: 9, opacity: 0.29 },
  { left: "34%", top: "14%", size: 4, opacity: 0.33 },
  { left: "39%", top: "48%", size: 7, opacity: 0.25 },
  { left: "44%", top: "67%", size: 5, opacity: 0.27 },
  { left: "48%", top: "19%", size: 4, opacity: 0.29 },
  { left: "51%", top: "26%", size: 10, opacity: 0.31 },
  { left: "57%", top: "57%", size: 6, opacity: 0.24 },
  { left: "63%", top: "16%", size: 5, opacity: 0.31 },
  { left: "68%", top: "73%", size: 8, opacity: 0.26 },
  { left: "72%", top: "39%", size: 4, opacity: 0.34 },
  { left: "76%", top: "14%", size: 5, opacity: 0.3 },
  { left: "78%", top: "58%", size: 6, opacity: 0.24 },
  { left: "83%", top: "22%", size: 9, opacity: 0.28 },
  { left: "88%", top: "68%", size: 5, opacity: 0.29 },
  { left: "92%", top: "34%", size: 7, opacity: 0.25 },
  { left: "94%", top: "54%", size: 4, opacity: 0.27 },
];

const DEGREE_TO_RADIAN = Math.PI / 180;

function formatPx(value: number) {
  return `${value.toFixed(2)}px`;
}

function formatScale(value: number) {
  return value.toFixed(3);
}

function polarOffset(distance: number, angle: number) {
  const radians = angle * DEGREE_TO_RADIAN;

  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  };
}

// Genera rutas deterministas e irregulares para que la deriva se sienta orgánica sin pasar el hero a cliente.
function buildParticleStyle(anchor: HeroParticleAnchor, index: number): ParticleStyle {
  const amplitude = 18 + anchor.size * 1.6 + (index % 4) * 2.2;
  const duration = 17.2 + (index % 5) * 0.95 + (anchor.size % 3) * 0.7;
  const cycleOffset = index * 1.72 + (index % 4) * 0.57;
  const renderedSize = Math.max(2, Math.round(anchor.size * 0.46));
  const renderedOpacity = 1;
  const baseAngle = (index * 37 + 24) % 360;
  const waypointAngles = [
    (baseAngle + 28) % 360,
    (baseAngle + 106 + (index % 3) * 11) % 360,
    (baseAngle + 231 - (index % 4) * 13) % 360,
    (baseAngle + 318 + (index % 5) * 7) % 360,
  ];
  const waypointDistances = [
    amplitude * 0.34,
    amplitude * 0.78,
    amplitude * 0.56,
    amplitude,
  ];
  const [point1, point2, point3, point4] = waypointAngles.map((angle, waypointIndex) =>
    polarOffset(waypointDistances[waypointIndex], angle),
  );
  const baseScale = 0.9 + (index % 4) * 0.028;

  return {
    left: anchor.left,
    top: anchor.top,
    width: `${renderedSize}px`,
    height: `${renderedSize}px`,
    "--hero-particle-life": `${duration.toFixed(2)}s`,
    "--hero-particle-delay": `-${(cycleOffset % duration).toFixed(2)}s`,
    "--hero-particle-opacity": renderedOpacity.toFixed(2),
    "--hero-particle-x1": formatPx(point1.x),
    "--hero-particle-y1": formatPx(point1.y),
    "--hero-particle-x2": formatPx(point2.x),
    "--hero-particle-y2": formatPx(point2.y),
    "--hero-particle-x3": formatPx(point3.x),
    "--hero-particle-y3": formatPx(point3.y),
    "--hero-particle-x4": formatPx(point4.x),
    "--hero-particle-y4": formatPx(point4.y),
    "--hero-particle-scale-0": formatScale(baseScale),
    "--hero-particle-scale-1": formatScale(baseScale + 0.07),
    "--hero-particle-scale-2": formatScale(baseScale + 0.12 - (index % 2) * 0.02),
    "--hero-particle-scale-3": formatScale(baseScale + 0.05),
    "--hero-particle-scale-4": formatScale(baseScale + 0.1),
  };
}

const particles = particleAnchors.map((anchor, index) => ({
  key: `${anchor.left}-${anchor.top}-${index}`,
  style: buildParticleStyle(anchor, index),
}));

export function HeroParticles() {
  return (
    <div aria-hidden="true" className={styles.field}>
      {particles.map((particle) => (
        <span key={particle.key} className={styles.particle} style={particle.style} />
      ))}
    </div>
  );
}
