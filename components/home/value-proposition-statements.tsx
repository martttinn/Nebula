"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type CSSProperties } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { WordByWordColorChange } from "@/components/ui/word-by-word-color-change";

import styles from "./value-proposition-ornaments.module.css";
import abstract1 from "@/public/abstract-icons/abstract1.png";
import abstract2 from "@/public/abstract-icons/abstract2.png";
import abstract3 from "@/public/abstract-icons/abstract3.png";
import abstract4 from "@/public/abstract-icons/abstract4.png";
import abstract5 from "@/public/abstract-icons/abstract5.png";
import abstract6 from "@/public/abstract-icons/abstract6.png";

const valuePhrases = [
  "Comprendemos tu negocio antes de construir.",
  "Recupera el tiempo perdido en tareas repetitivas.",
  "Mantenemos y mejoramos continuamente tu producto.",
];

const phraseWordOverrides = [
  {
    5: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
  {
    2: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
  {
    5: {
      initialColor: "#534AB7",
      activeColor: "#534AB7",
    },
  },
] as const;

const phraseUnreadColor = "rgba(232,232,240,0.28)";
const phraseReadColor = "#E8E8F0";
const stickyStageHeight = `${100 + valuePhrases.length * 400}svh`;
const benefitsOrnamentWidth = "clamp(8.75rem,19vw,14.5rem)";
const benefitsOrnamentSizes =
  "(min-width: 1280px) 14.5rem, (min-width: 640px) 19vw, 8.75rem";

type PhraseOrnament = {
  src: StaticImageData;
  width: string;
  top: string;
  topMobile?: string;
  left?: string;
  leftMobile?: string;
  right?: string;
  rightMobile?: string;
  rotation: number;
  entryOpacity?: number;
  opacity: number;
  driftDuration: string;
  driftDelay: string;
  driftX: string;
  driftY: string;
};

const phraseOrnaments: readonly (readonly PhraseOrnament[])[] = [
  [
    {
      src: abstract5,
      width: benefitsOrnamentWidth,
      top: "16%",
      topMobile: "4%",
      left: "clamp(1.5rem,8vw,6.5rem)",
      leftMobile: "2%",
      rotation: -10,
      entryOpacity: 0.42,
      opacity: 1,
      driftDuration: "24s",
      driftDelay: "-4s",
      driftX: "20px",
      driftY: "16px",
    },
    {
      src: abstract6,
      width: benefitsOrnamentWidth,
      top: "60%",
      topMobile: "80%",
      right: "clamp(1.5rem,8vw,6.75rem)",
      rightMobile: "2%",
      rotation: 9,
      entryOpacity: 0.46,
      opacity: 1,
      driftDuration: "28s",
      driftDelay: "-10s",
      driftX: "-22px",
      driftY: "18px",
    },
  ],
  [
    {
      src: abstract3,
      width: benefitsOrnamentWidth,
      top: "18%",
      topMobile: "4%",
      left: "clamp(0.5rem,4vw,3.75rem)",
      leftMobile: "2%",
      rotation: -8,
      opacity: 0.76,
      driftDuration: "25s",
      driftDelay: "-6s",
      driftX: "18px",
      driftY: "20px",
    },
    {
      src: abstract4,
      width: benefitsOrnamentWidth,
      top: "56%",
      topMobile: "80%",
      right: "clamp(1rem,7vw,5rem)",
      rightMobile: "2%",
      rotation: 10,
      opacity: 0.72,
      driftDuration: "27s",
      driftDelay: "-12s",
      driftX: "-18px",
      driftY: "16px",
    },
  ],
  [
    {
      src: abstract1,
      width: benefitsOrnamentWidth,
      top: "57%",
      topMobile: "80%",
      left: "clamp(1rem,6vw,4.75rem)",
      leftMobile: "2%",
      rotation: -11,
      opacity: 0.74,
      driftDuration: "26s",
      driftDelay: "-7s",
      driftX: "20px",
      driftY: "-18px",
    },
    {
      src: abstract2,
      width: benefitsOrnamentWidth,
      top: "19%",
      topMobile: "4%",
      right: "clamp(0.5rem,5vw,4rem)",
      rightMobile: "2%",
      rotation: 8,
      opacity: 0.76,
      driftDuration: "29s",
      driftDelay: "-14s",
      driftX: "-20px",
      driftY: "18px",
    },
  ],
];

type OrnamentDriftStyle = CSSProperties & {
  "--benefits-drift-duration": string;
  "--benefits-drift-delay": string;
  "--benefits-drift-x": string;
  "--benefits-drift-y": string;
};

type OrnamentPositionStyle = CSSProperties & {
  "--benefits-top-desktop": string;
  "--benefits-top-mobile": string;
  "--benefits-left-desktop": string;
  "--benefits-left-mobile": string;
  "--benefits-right-desktop": string;
  "--benefits-right-mobile": string;
};

type StaticOrnamentStyle = OrnamentPositionStyle & CSSProperties;

type StickyStatementItemProps = {
  phrase: string;
  index: number;
  progress: MotionValue<number>;
};

type PhraseOrnamentsProps = {
  index: number;
  phraseStart: number;
  phraseEnd: number;
  fadeInEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  progress: MotionValue<number>;
};

type AnimatedPhraseOrnamentProps = {
  ornament: PhraseOrnament;
  eager?: boolean;
  phraseStart: number;
  phraseEnd: number;
  fadeInEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  progress: MotionValue<number>;
};

function AnimatedPhraseOrnament({
  ornament,
  eager = false,
  phraseStart,
  phraseEnd,
  fadeInEnd,
  fadeOutStart,
  fadeOutEnd,
  progress,
}: AnimatedPhraseOrnamentProps) {
  const opacity = useTransform(
    progress,
    [phraseStart, fadeInEnd, fadeOutStart, fadeOutEnd, phraseEnd],
    [
      ornament.entryOpacity ?? 0,
      ornament.opacity,
      ornament.opacity,
      0,
      0,
    ],
  );
  const scale = useTransform(
    progress,
    [phraseStart, fadeInEnd, fadeOutStart, phraseEnd],
    [0.78, 1, 1, 1],
  );
  const y = useTransform(
    progress,
    [phraseStart, fadeInEnd, fadeOutStart, phraseEnd],
    [24, 0, 0, 0],
  );
  const driftStyle: OrnamentDriftStyle = {
    "--benefits-drift-duration": ornament.driftDuration,
    "--benefits-drift-delay": ornament.driftDelay,
    "--benefits-drift-x": ornament.driftX,
    "--benefits-drift-y": ornament.driftY,
  };
  const positionStyle: OrnamentPositionStyle = {
    "--benefits-top-desktop": ornament.top,
    "--benefits-top-mobile": ornament.topMobile ?? ornament.top,
    "--benefits-left-desktop": ornament.left ?? "auto",
    "--benefits-left-mobile": ornament.leftMobile ?? ornament.left ?? "auto",
    "--benefits-right-desktop": ornament.right ?? "auto",
    "--benefits-right-mobile": ornament.rightMobile ?? ornament.right ?? "auto",
  };

  return (
    <motion.div
      className={styles.anchor}
      style={{
        ...positionStyle,
        width: ornament.width,
        rotate: `${ornament.rotation}deg`,
        opacity,
        scale,
        y,
      }}
    >
      <div className={styles.drift} style={driftStyle}>
        <Image
          alt=""
          aria-hidden="true"
          className={styles.image}
          decoding="async"
          draggable={false}
          fetchPriority={eager ? "high" : undefined}
          loading="eager"
          placeholder="empty"
          priority={eager}
          sizes={benefitsOrnamentSizes}
          src={ornament.src}
        />
      </div>
    </motion.div>
  );
}

function PhraseOrnaments({
  index,
  phraseStart,
  phraseEnd,
  fadeInEnd,
  fadeOutStart,
  fadeOutEnd,
  progress,
}: PhraseOrnamentsProps) {
  return (
    <div aria-hidden="true" className={styles.field}>
      {phraseOrnaments[index].map((ornament) => (
        <AnimatedPhraseOrnament
          eager={index === 0}
          key={ornament.src.src}
          fadeInEnd={fadeInEnd}
          fadeOutEnd={fadeOutEnd}
          fadeOutStart={fadeOutStart}
          ornament={ornament}
          phraseEnd={phraseEnd}
          phraseStart={phraseStart}
          progress={progress}
        />
      ))}
    </div>
  );
}

function StaticPhraseOrnaments({ index }: Pick<PhraseOrnamentsProps, "index">) {
  return (
    <div aria-hidden="true" className={styles.field}>
      {phraseOrnaments[index].map((ornament) => (
        <div
          key={ornament.src.src}
          className={styles.anchor}
          style={
            {
              "--benefits-top-desktop": ornament.top,
              "--benefits-top-mobile": ornament.topMobile ?? ornament.top,
              "--benefits-left-desktop": ornament.left ?? "auto",
              "--benefits-left-mobile":
                ornament.leftMobile ?? ornament.left ?? "auto",
              "--benefits-right-desktop": ornament.right ?? "auto",
              "--benefits-right-mobile":
                ornament.rightMobile ?? ornament.right ?? "auto",
              width: ornament.width,
              rotate: `${ornament.rotation}deg`,
              opacity: ornament.opacity,
            } as StaticOrnamentStyle
          }
        >
          <Image
            alt=""
            aria-hidden="true"
            className={styles.image}
            decoding="async"
            draggable={false}
            fetchPriority={index === 0 ? "high" : undefined}
            loading="eager"
            placeholder="empty"
            priority={index === 0}
            sizes={benefitsOrnamentSizes}
            src={ornament.src}
          />
        </div>
      ))}
    </div>
  );
}

function StickyStatementItem({
  phrase,
  index,
  progress,
}: StickyStatementItemProps) {
  const phraseStart = index / valuePhrases.length;
  const phraseEnd = (index + 1) / valuePhrases.length;
  const phraseSpan = phraseEnd - phraseStart;
  const fadeInEnd = phraseStart + phraseSpan * 0.2;
  const colorEnd = phraseStart + phraseSpan * 0.84;
  const fadeOutStart = phraseStart + phraseSpan * 0.87;
  const fadeOutEnd = phraseStart + phraseSpan * 0.975;

  const opacity = useTransform(
    progress,
    [phraseStart, fadeInEnd, fadeOutStart, fadeOutEnd, phraseEnd],
    [0, 1, 1, 0, 0],
  );
  const y = useTransform(
    progress,
    [phraseStart, fadeInEnd, fadeOutStart, fadeOutEnd, phraseEnd],
    [48, 0, 0, -40, -40],
  );
  const scale = useTransform(
    progress,
    [phraseStart, fadeInEnd, fadeOutStart, fadeOutEnd, phraseEnd],
    [0.985, 1, 1, 0.992, 0.992],
  );

  return (
    <motion.article
      data-benefits-phrase={index + 1}
      className="absolute inset-0 flex items-center justify-center overflow-hidden px-6 text-center sm:px-10"
      style={{ opacity, y, scale }}
    >
      <PhraseOrnaments
        fadeInEnd={fadeInEnd}
        fadeOutEnd={fadeOutEnd}
        fadeOutStart={fadeOutStart}
        index={index}
        phraseEnd={phraseEnd}
        phraseStart={phraseStart}
        progress={progress}
      />

      <h2 className="relative z-10">
        <WordByWordColorChange
          text={phrase}
          progress={progress}
          progressRange={[phraseStart, colorEnd]}
          unreadColor={phraseUnreadColor}
          readColor={phraseReadColor}
          wordColorOverrides={phraseWordOverrides[index]}
          className="mx-auto max-w-5xl text-center font-display text-4xl font-bold leading-[0.96] tracking-[-0.055em] sm:text-5xl lg:text-6xl"
        />
      </h2>
    </motion.article>
  );
}

function ReducedMotionStatements() {
  const reducedProgress = useMotionValue(1);

  return (
    <div className="grid gap-12 py-24 sm:gap-16 sm:py-28 lg:gap-20 lg:py-32">
      {valuePhrases.map((phrase, index) => (
        <article
          key={phrase}
          className="relative flex min-h-[16rem] items-center justify-center overflow-hidden text-center sm:min-h-[18rem] lg:min-h-[20rem]"
        >
          <StaticPhraseOrnaments index={index} />

          <h2 className="relative z-10">
            <WordByWordColorChange
              text={phrase}
              progress={reducedProgress}
              progressRange={[0, 1]}
              unreadColor={phraseUnreadColor}
              readColor={phraseReadColor}
              wordColorOverrides={phraseWordOverrides[index]}
              className="mx-auto max-w-5xl text-center font-display text-4xl font-bold leading-[0.96] tracking-[-0.055em] sm:text-5xl lg:text-6xl"
            />
          </h2>
        </article>
      ))}
    </div>
  );
}

export function ValuePropositionStatements() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.24,
  });
  const activeProgress = prefersReducedMotion ? scrollYProgress : smoothedProgress;

  if (prefersReducedMotion) {
    return <ReducedMotionStatements />;
  }

  return (
    <div
      ref={targetRef}
      className="relative"
      data-benefits-stage="true"
      style={{ height: stickyStageHeight }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center">
        <div className="relative h-full w-full">
          {valuePhrases.map((phrase, index) => (
            <StickyStatementItem
              key={phrase}
              phrase={phrase}
              index={index}
              progress={activeProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
