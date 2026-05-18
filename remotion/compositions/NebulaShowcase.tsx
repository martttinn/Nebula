import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { nebulaVideoFonts } from "../theme/fonts";
import { nebulaVideoTokens } from "../theme/tokens";
import { useNebulaVideoFonts } from "../useNebulaVideoFonts";
import { nebulaAssets } from "../utils/assets";

const cardSurfaceStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 620,
  padding: "36px 40px",
  borderRadius: nebulaVideoTokens.radius.xl,
  border: `1px solid rgba(255,255,255,0.08)`,
  background:
    "linear-gradient(180deg, rgba(11, 12, 23, 0.94) 0%, rgba(10, 15, 46, 0.88) 100%)",
  boxShadow: nebulaVideoTokens.shadows.panel,
  overflow: "hidden",
};

const eyebrowStyle: CSSProperties = {
  fontFamily: nebulaVideoFonts.sans,
  fontSize: 18,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(181, 177, 227, 0.76)",
};

export const NebulaShowcase = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  useNebulaVideoFonts();

  const intro = spring({
    fps,
    frame: frame - 6,
    config: {
      damping: 18,
      stiffness: 90,
      mass: 0.9,
    },
  });

  const panelIntro = spring({
    fps,
    frame: frame - 18,
    config: {
      damping: 20,
      stiffness: 88,
      mass: 1,
    },
  });

  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 28, durationInFrames - 6],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [18, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentShift = interpolate(frame, [0, durationInFrames], [-120, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const planetFloat = interpolate(frame % 120, [0, 60, 120], [0, -28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconFloat = interpolate(frame % 150, [0, 75, 150], [0, 18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: nebulaVideoTokens.colors.void,
        color: nebulaVideoTokens.colors.silver,
        fontFamily: nebulaVideoFonts.sans,
        opacity: outroOpacity,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 12%, rgba(83, 74, 183, 0.34), transparent 32%),
            radial-gradient(circle at 84% 18%, rgba(10, 15, 46, 0.92), transparent 22%),
            linear-gradient(180deg, rgba(9, 9, 15, 0.96), rgba(9, 9, 15, 1))
          `,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "linear-gradient(to right, rgba(232,232,240,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,232,240,0.08) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          transform: `translate3d(${accentShift}px, 0, 0)`,
        }}
      />

      <Img
        src={nebulaAssets.planets.planet1}
        alt=""
        style={{
          position: "absolute",
          right: 138,
          top: 140,
          width: 430,
          height: 430,
          objectFit: "contain",
          transform: `translate3d(0, ${planetFloat}px, 0) scale(${0.88 + intro * 0.12})`,
          opacity: 0.94,
          filter: "drop-shadow(0 30px 90px rgba(83, 74, 183, 0.32))",
        }}
      />

      <Img
        src={nebulaAssets.icons3d.mobile}
        alt=""
        style={{
          position: "absolute",
          left: 114,
          bottom: 96,
          width: 250,
          height: 250,
          objectFit: "contain",
          transform: `translate3d(0, ${iconFloat}px, 0) rotate(-8deg)`,
          opacity: 0.94,
          filter: "drop-shadow(0 24px 72px rgba(0,0,0,0.35))",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 104,
          top: 88,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Img
          src={nebulaAssets.logo.symbolDark}
          alt=""
          style={{
            width: 52,
            height: 52,
            objectFit: "contain",
          }}
        />
        <Img
          src={nebulaAssets.logo.horizontalDark}
          alt="Nebula Studios"
          style={{
            height: 36,
            width: 250,
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 104,
          right: 104,
          top: 176,
          bottom: 104,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          alignItems: "center",
          gap: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            transform: `translate3d(0, ${interpolate(intro, [0, 1], [72, 0])}px, 0)`,
          }}
        >
          <span style={eyebrowStyle}>Remotion dev-only</span>
          <h1
            style={{
              margin: 0,
              maxWidth: 760,
              fontFamily: nebulaVideoFonts.display,
              fontSize: 118,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.06em",
              color: nebulaVideoTokens.colors.silver,
              opacity: titleOpacity,
            }}
          >
            Nebula
            <br />
            video pipeline
          </h1>

          <Sequence from={20}>
            <p
              style={{
                margin: 0,
                maxWidth: 680,
                fontSize: 34,
                lineHeight: 1.42,
                color: "rgba(232, 232, 240, 0.86)",
                opacity: subtitleOpacity,
              }}
            >
              Una base aislada para renders locales con branding Nebula, sin
              acoplar el sistema de vídeo al runtime público de Next.js.
            </p>
          </Sequence>
        </div>

        <Sequence from={16}>
          <div
            style={{
              ...cardSurfaceStyle,
              transform: `translate3d(${interpolate(panelIntro, [0, 1], [90, 0])}px, 0, 0) scale(${0.94 + panelIntro * 0.06})`,
              opacity: interpolate(frame, [16, 42], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 12% 18%, rgba(83,74,183,0.18), transparent 34%)",
              }}
            />
            <span style={{ ...eyebrowStyle, position: "relative", zIndex: 1 }}>
              Composición base
            </span>
            <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 18 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: nebulaVideoFonts.display,
                  fontSize: 58,
                  fontWeight: 700,
                  lineHeight: 0.96,
                  letterSpacing: "-0.05em",
                }}
              >
                NebulaShowcase
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 26,
                  lineHeight: 1.52,
                  color: "rgba(232, 232, 240, 0.82)",
                }}
              >
                1920x1080 · 30 fps · 240 frames
              </p>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gap: 18,
                paddingTop: 6,
              }}
            >
              {[
                "Studio local con Remotion CLI",
                "Fuentes Syne + Inter cargadas fuera de Next",
                "Assets reales de public/ reutilizados en vídeo",
              ].map((line) => (
                <div
                  key={line}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 24,
                    lineHeight: 1.4,
                    color: "rgba(232, 232, 240, 0.88)",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: nebulaVideoTokens.colors.lilac,
                      boxShadow: "0 0 18px rgba(83, 74, 183, 0.55)",
                      flexShrink: 0,
                    }}
                  />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
