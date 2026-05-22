"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import styles from "./split-text.module.css";

type SplitTextProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> & {
  text: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  active?: boolean;
  hideUntilStart?: boolean;
  segmentClassName?: string;
  tokenClassNameMap?: Record<string, string>;
  onComplete?: () => void;
};

type TextUnit = {
  id: string;
  value: string;
};

type TextToken = {
  id: string;
  value: string;
  isSpace: boolean;
  units: TextUnit[];
};

type IndexedTextUnit = TextUnit & {
  animationIndex: number;
};

type IndexedTextToken = Omit<TextToken, "units"> & {
  units: IndexedTextUnit[];
};

const graphemeSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function segmentCharacters(text: string): TextUnit[] {
  if (graphemeSegmenter) {
    return Array.from(graphemeSegmenter.segment(text)).map((segment, index) => ({
      id: `char-${index}-${segment.segment}`,
      value: segment.segment,
    }));
  }

  return Array.from(text).map((value, index) => ({
    id: `char-${index}-${value}`,
    value,
  }));
}

function segmentText(text: string, splitType: "chars" | "words"): TextToken[] {
  return text.split(/(\s+)/).map((value, index) => {
    const isSpace = /^\s+$/.test(value);

    if (isSpace) {
      return {
        id: `space-${index}-${value}`,
        value,
        isSpace: true,
        units: [],
      };
    }

    return {
      id: `${splitType}-${index}-${value}`,
      value,
      isSpace: false,
      units:
        splitType === "words"
          ? [{ id: `word-${index}-${value}`, value }]
          : segmentCharacters(value),
    };
  });
}

export function SplitText({
  text,
  delay = 50,
  duration = 0.9,
  splitType = "chars",
  active = false,
  hideUntilStart = false,
  className,
  segmentClassName,
  tokenClassNameMap,
  onComplete,
  ...props
}: SplitTextProps) {
  const tokens = React.useMemo(() => segmentText(text, splitType), [text, splitType]);
  const completionCalledRef = React.useRef(false);

  React.useEffect(() => {
    completionCalledRef.current = false;
  }, [active, text, splitType]);

  const indexedTokens = React.useMemo<IndexedTextToken[]>(() => {
    return tokens.reduce<{
      nextAnimationIndex: number;
      tokens: IndexedTextToken[];
    }>(
      (accumulator, token) => {
        if (token.isSpace) {
          return {
            nextAnimationIndex: accumulator.nextAnimationIndex,
            tokens: [
              ...accumulator.tokens,
              {
                ...token,
                units: [],
              },
            ],
          };
        }

        const units = token.units.map((unit, unitIndex) => ({
          ...unit,
          animationIndex: accumulator.nextAnimationIndex + unitIndex,
        }));

        return {
          nextAnimationIndex: accumulator.nextAnimationIndex + units.length,
          tokens: [
            ...accumulator.tokens,
            {
              ...token,
              units,
            },
          ],
        };
      },
      {
        nextAnimationIndex: 0,
        tokens: [],
      },
    ).tokens;
  }, [tokens]);

  const totalAnimatedUnits = React.useMemo(
    () => indexedTokens.reduce((count, token) => count + token.units.length, 0),
    [indexedTokens],
  );

  return (
    <span
      className={cn(
        styles.root,
        hideUntilStart && !active && styles.hiddenBeforeStart,
        className,
      )}
      {...props}
    >
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true" className={styles.visual}>
        {indexedTokens.map((token) => {
          if (token.isSpace) {
            return (
              <span key={token.id} className={styles.space}>
                {token.value}
              </span>
            );
          }

          return (
            <span key={token.id} className={styles.word}>
              {token.units.map((unit) => {
                return (
                  <motion.span
                    key={unit.id}
                    className={cn(
                      styles.segment,
                      segmentClassName,
                      tokenClassNameMap?.[token.value],
                    )}
                    initial={{ opacity: 0, y: "0.68em", filter: "blur(9px)" }}
                    animate={
                      active
                        ? { opacity: 1, y: "0em", filter: "blur(0px)" }
                        : { opacity: hideUntilStart ? 0 : 1, y: "0em", filter: "blur(0px)" }
                    }
                    transition={{
                      duration,
                      delay: active ? (delay / 1000) * unit.animationIndex : 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onAnimationComplete={() => {
                      if (
                        active &&
                        unit.animationIndex === totalAnimatedUnits - 1 &&
                        !completionCalledRef.current
                      ) {
                        completionCalledRef.current = true;
                        onComplete?.();
                      }
                    }}
                  >
                    {unit.value}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
