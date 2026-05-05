"use client";

import React, { useEffect, useId, useState } from "react";
import { motion, useAnimation, type Transition } from "framer-motion";

export interface NebulaLogoAnimatedProps {
  size?: number;
  fadeDuration?: number;
  glossyDuration?: number;
  paused?: boolean;
  onFadeComplete?: () => void;
  className?: string;
}

export function NebulaLogoAnimated({
  size = 90,
  fadeDuration = 0.9,
  glossyDuration = 3,
  paused = false,
  onFadeComplete,
  className,
}: NebulaLogoAnimatedProps) {
  const uid = useId().replace(/:/g, "u");
  const [glossyActive, setGlossyActive] = useState(false);
  const sheenCtrl = useAnimation();

  useEffect(() => {
    if (!glossyActive) {
      return;
    }

    if (paused) {
      sheenCtrl.stop();
      return;
    }

    sheenCtrl.start({
      translateX: [-110, 270],
      transition: {
        duration: glossyDuration,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 2,
      } satisfies Transition,
    });
  }, [glossyActive, paused, glossyDuration, sheenCtrl]);

  const svgHeight = size * (210 / 180);

  return (
    <motion.svg
      width={size}
      height={svgHeight}
      viewBox="0 0 180 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nebula logo"
      role="img"
      className={className}
      style={{ display: "block", overflow: "visible" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        setGlossyActive(true);
        onFadeComplete?.();
      }}
    >
      <defs>
        <linearGradient id={`${uid}-g0`} x1="108" y1="0" x2="175.087" y2="95.8389" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="0.25" stopColor="#D4D0F8" />
          <stop offset="0.6" stopColor="#7B74D4" />
          <stop offset="1" stopColor="#534AB7" />
        </linearGradient>
        <linearGradient id={`${uid}-g1`} x1="90" y1="53" x2="192.922" y2="142.067" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7B74D4" />
          <stop offset="0.3" stopColor="#534AB7" />
          <stop offset="1" stopColor="#1A1A2E" />
        </linearGradient>
        <linearGradient id={`${uid}-g2`} x1="90" y1="105" x2="147.124" y2="202.927" gradientUnits="userSpaceOnUse">
          <stop stopColor="#534AB7" />
          <stop offset="0.5" stopColor="#26215C" />
          <stop offset="1" stopColor="#0A0F2E" />
        </linearGradient>
        <linearGradient id={`${uid}-g3`} x1="72" y1="105" x2="4.91275" y2="200.839" gradientUnits="userSpaceOnUse">
          <stop stopColor="#26215C" />
          <stop offset="0.6" stopColor="#0F0F1A" />
          <stop offset="1" stopColor="#09090F" />
        </linearGradient>
        <linearGradient id={`${uid}-g4`} x1="90" y1="53" x2="-12.9224" y2="142.067" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3D3890" />
          <stop offset="0.4" stopColor="#1A1A2E" />
          <stop offset="1" stopColor="#0A0F2E" />
        </linearGradient>
        <linearGradient id={`${uid}-g5`} x1="72" y1="0" x2="4.91275" y2="95.8389" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8E8F0" />
          <stop offset="0.3" stopColor="#AFA9EC" />
          <stop offset="0.7" stopColor="#6B63CC" />
          <stop offset="1" stopColor="#534AB7" />
        </linearGradient>
        <linearGradient id={`${uid}-g6`} x1="0" y1="0" x2="0" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-sheen`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="0.3" />
          <stop offset="50%" stopColor="white" stopOpacity="0.75" />
          <stop offset="60%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <path d="M90 0L180 53V157L90 210L0 157V53Z" />
        </clipPath>
      </defs>

      <path d="M90 0L180 53L90 105V0Z" fill={`url(#${uid}-g0)`} />
      <path d="M180 53V157L90 105L180 53Z" fill={`url(#${uid}-g1)`} />
      <path d="M180 157L90 210V105L180 157Z" fill={`url(#${uid}-g2)`} />
      <path d="M90 210L0 157L90 105V210Z" fill={`url(#${uid}-g3)`} />
      <path d="M0 157V53L90 105L0 157Z" fill={`url(#${uid}-g4)`} />
      <path d="M0 53L90 0V105L0 53Z" fill={`url(#${uid}-g5)`} />
      <path d="M0 53L90 0L180 53L90 105L0 53Z" fill={`url(#${uid}-g6)`} />

      <g clipPath={`url(#${uid}-clip)`}>
        {glossyActive && (
          <motion.g initial={{ translateX: -100 }} animate={sheenCtrl}>
            <rect
              x="0"
              y="-20"
              width="45"
              height="250"
              fill={`url(#${uid}-sheen)`}
              transform="rotate(-22, 22, 105)"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.g>
        )}
      </g>
    </motion.svg>
  );
}
