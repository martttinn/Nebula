import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { HOME_SERVICES } from "../../data/services";
import { nebulaVideoFonts } from "../theme/fonts";
import { nebulaVideoTokens } from "../theme/tokens";
import { useNebulaVideoFonts } from "../useNebulaVideoFonts";
import { nebulaAssets } from "../utils/assets";

const [mobileService, webService, evolutionService, consultingService] =
  HOME_SERVICES;

const editorialServices = [
  {
    ...webService,
    iconSrc: nebulaAssets.icons3d.web,
  },
  {
    ...mobileService,
    iconSrc: nebulaAssets.icons3d.mobile,
  },
  {
    ...evolutionService,
    iconSrc: nebulaAssets.icons3d.chart,
  },
  {
    ...consultingService,
    iconSrc: nebulaAssets.icons3d.search,
  },
] as const;

const starField = [
  { top: 88, left: 180, size: 4, alpha: 0.66 },
  { top: 142, left: 742, size: 5, alpha: 0.48 },
  { top: 204, left: 1528, size: 3, alpha: 0.6 },
  { top: 322, left: 1260, size: 4, alpha: 0.5 },
  { top: 468, left: 236, size: 3, alpha: 0.72 },
  { top: 556, left: 980, size: 5, alpha: 0.58 },
  { top: 712, left: 1610, size: 4, alpha: 0.52 },
  { top: 862, left: 412, size: 4, alpha: 0.44 },
  { top: 908, left: 1320, size: 3, alpha: 0.7 },
  { top: 976, left: 1760, size: 4, alpha: 0.56 },
] as const;

const cinematicEase = Easing.bezier(0.16, 1, 0.3, 1);
const editorialEase = Easing.bezier(0.45, 0, 0.55, 1);
const exitEase = Easing.bezier(0.7, 0, 0.84, 0);

const eyebrowStyle: CSSProperties = {
  margin: 0,
  fontFamily: nebulaVideoFonts.sans,
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(181, 177, 227, 0.78)",
};

const bodyStyle: CSSProperties = {
  margin: 0,
  fontFamily: nebulaVideoFonts.sans,
  fontSize: 30,
  lineHeight: 1.48,
  color: "rgba(232, 232, 240, 0.84)",
};

const labelPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  width: "fit-content",
  padding: "14px 20px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(232, 232, 240, 0.88)",
  fontFamily: nebulaVideoFonts.sans,
  fontSize: 20,
  lineHeight: 1.2,
  letterSpacing: "0.04em",
};

const serviceCardStyle: CSSProperties = {
  position: "relative",
  display: "grid",
  gap: 16,
  padding: "28px 32px",
  borderRadius: nebulaVideoTokens.radius.lg,
  border: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(11, 12, 23, 0.92) 0%, rgba(10, 15, 46, 0.84) 100%)",
  boxShadow: nebulaVideoTokens.shadows.panel,
  overflow: "hidden",
};

const progressBetween = (
  frame: number,
  startFrame: number,
  endFrame: number,
  easing = cinematicEase,
) =>
  interpolate(frame, [startFrame, endFrame], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const CinematicBackdrop = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const gridShiftX = interpolate(
    frame,
    [0, durationInFrames],
    [-120, 92],
    {
      easing: editorialEase,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const gridShiftY = interpolate(
    frame,
    [0, durationInFrames],
    [0, -46],
    {
      easing: editorialEase,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const haloDrift = interpolate(
    frame,
    [0, durationInFrames],
    [-48, 68],
    {
      easing: editorialEase,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 18% 16%, rgba(83, 74, 183, 0.28), transparent 32%), radial-gradient(circle at 86% 18%, rgba(16, 23, 68, 0.92), transparent 24%), linear-gradient(180deg, rgba(9, 9, 15, 0.98), rgba(9, 9, 15, 1))",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 72% 68%, rgba(83, 74, 183, 0.2), transparent 28%), radial-gradient(circle at 28% 84%, rgba(10, 15, 46, 0.82), transparent 28%)",
          transform: `translate3d(${haloDrift}px, ${-haloDrift * 0.34}px, 0)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -140,
          opacity: 0.05,
          backgroundImage:
            "linear-gradient(to right, rgba(232,232,240,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,232,240,0.09) 1px, transparent 1px)",
          backgroundSize: "144px 144px",
          transform: `translate3d(${gridShiftX}px, ${gridShiftY}px, 0) rotate(-7deg)`,
        }}
      />

      {starField.map((star, index) => {
        const localFrame = (frame + index * 11) % 180;
        const twinkle = interpolate(localFrame, [0, 90, 180], [0.38, 1, 0.38], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const driftY = interpolate(localFrame, [0, 90, 180], [0, -12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={`${star.top}-${star.left}`}
            style={{
              position: "absolute",
              top: star.top + driftY,
              left: star.left,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: "rgba(232, 232, 240, 1)",
              opacity: star.alpha * twinkle,
              boxShadow: "0 0 18px rgba(232, 232, 240, 0.24)",
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,15,0.22) 0%, rgba(9,9,15,0) 16%, rgba(9,9,15,0) 84%, rgba(9,9,15,0.58) 100%)",
        }}
      />
    </>
  );
};

const PersistentLockup = () => {
  const frame = useCurrentFrame();
  const opacity =
    progressBetween(frame, 8, 28, editorialEase) *
    (1 - progressBetween(frame, 230, 270, exitEase));

  return (
    <div
      style={{
        position: "absolute",
        top: 78,
        left: 90,
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity,
      }}
    >
      <Img
        src={nebulaAssets.logo.symbolDark}
        alt=""
        style={{
          width: 48,
          height: 48,
          objectFit: "contain",
        }}
      />
      <span
        style={{
          fontFamily: nebulaVideoFonts.display,
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "rgba(232, 232, 240, 0.92)",
        }}
      >
        Nebula Studios
      </span>
    </div>
  );
};

const HeroPromiseScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = progressBetween(frame, 0, 42);
  const exit = progressBetween(frame, 92, 138, exitEase);
  const sceneOpacity = interpolate(enter - exit, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(enter, [0, 1], [78, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) + interpolate(exit, [0, 1], [0, -44], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleSlide = interpolate(enter, [0, 1], [42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const planetPop = spring({
    fps,
    frame: frame - 8,
    config: {
      damping: 18,
      stiffness: 90,
      mass: 1,
    },
  });
  const planetFloat = interpolate(frame % 150, [0, 75, 150], [0, -24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconFloat = interpolate(frame % 132, [0, 66, 132], [0, 18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "180px 104px 120px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
        gap: 88,
        alignItems: "center",
        opacity: sceneOpacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
      }}
    >
      <div style={{ display: "grid", gap: 30 }}>
        <p style={eyebrowStyle}>Intro editorial</p>
        <h1
          style={{
            margin: 0,
            maxWidth: 880,
            fontFamily: nebulaVideoFonts.display,
            fontSize: 126,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.065em",
            color: nebulaVideoTokens.colors.silver,
            transform: `translate3d(0, ${titleSlide}px, 0)`,
          }}
        >
          <span>Software que hace crecer tu </span>
          <span style={{ color: nebulaVideoTokens.colors.lilac }}>
            negocio.
          </span>
        </h1>

        <p style={{ ...bodyStyle, maxWidth: 740 }}>
          Construimos productos digitales a medida para empresas locales que
          necesitan digitalizar sus procesos.
        </p>

        <div style={labelPillStyle}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: nebulaVideoTokens.colors.lilac,
              boxShadow: "0 0 24px rgba(83, 74, 183, 0.42)",
            }}
          />
          Desarrollo web, móvil y evolución de producto
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 760,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "16% 4% auto auto",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(83, 74, 183, 0.24) 0%, rgba(83, 74, 183, 0) 72%)",
            filter: "blur(14px)",
          }}
        />

        <Img
          src={nebulaAssets.planets.planet1}
          alt=""
          style={{
            position: "absolute",
            top: 62,
            right: 0,
            width: 520,
            height: 520,
            objectFit: "contain",
            transform: `translate3d(0, ${planetFloat}px, 0) scale(${0.9 + planetPop * 0.12})`,
            filter: "drop-shadow(0 28px 90px rgba(83, 74, 183, 0.3))",
          }}
        />

        <Img
          src={nebulaAssets.icons3d.web}
          alt=""
          style={{
            position: "absolute",
            left: 28,
            bottom: 150,
            width: 220,
            height: 220,
            objectFit: "contain",
            transform: `translate3d(0, ${iconFloat}px, 0) rotate(-8deg)`,
            filter: "drop-shadow(0 24px 72px rgba(0,0,0,0.34))",
          }}
        />
      </div>
    </div>
  );
};

const ServicesScene = () => {
  const frame = useCurrentFrame();
  const enter = progressBetween(frame, 0, 34);
  const exit = progressBetween(frame, 102, 142, exitEase);
  const sceneOpacity = interpolate(enter - exit, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(enter, [0, 1], [72, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) + interpolate(exit, [0, 1], [0, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const planetFloat = interpolate(frame % 172, [0, 86, 172], [0, 20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "164px 104px 116px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.82fr) minmax(0, 1.18fr)",
        gap: 80,
        alignItems: "start",
        opacity: sceneOpacity,
        transform: `translate3d(${translateX}px, 0, 0)`,
      }}
    >
      <div style={{ display: "grid", gap: 30, paddingTop: 42 }}>
        <p style={eyebrowStyle}>Servicios</p>
        <h2
          style={{
            margin: 0,
            maxWidth: 540,
            fontFamily: nebulaVideoFonts.display,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: "-0.06em",
            color: nebulaVideoTokens.colors.silver,
          }}
        >
          Productos digitales
          <br />
          <span style={{ color: nebulaVideoTokens.colors.lilac }}>
            a medida.
          </span>
        </h2>

        <p style={{ ...bodyStyle, maxWidth: 540 }}>
          Webs corporativas, webapps, portales y herramientas internas que
          potencian tu flujo de trabajo.
        </p>
      </div>

      <div style={{ position: "relative", minHeight: 760 }}>
        <div
          style={{
            position: "absolute",
            inset: "8% auto auto 62%",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(83, 74, 183, 0.18) 0%, rgba(83, 74, 183, 0) 74%)",
            filter: "blur(16px)",
          }}
        />

        <Img
          src={nebulaAssets.planets.planet3}
          alt=""
          style={{
            position: "absolute",
            top: -28,
            right: -8,
            width: 300,
            height: 300,
            objectFit: "contain",
            opacity: 0.82,
            transform: `translate3d(0, ${planetFloat}px, 0)`,
            filter: "drop-shadow(0 24px 72px rgba(83, 74, 183, 0.24))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gap: 20,
          }}
        >
          {editorialServices.map((service, index) => {
            const itemEnter = progressBetween(
              frame,
              8 + index * 10,
              32 + index * 10,
            );
            const itemExit = progressBetween(
              frame,
              116 + index * 4,
              144 + index * 4,
              exitEase,
            );
            const itemProgress = interpolate(
              itemEnter - itemExit,
              [0, 1],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );
            const itemOffset = interpolate(itemProgress, [0, 1], [42, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={service.slug}
                style={{
                  ...serviceCardStyle,
                  opacity: itemProgress,
                  transform: `translate3d(${itemOffset}px, 0, 0) scale(${0.96 + itemProgress * 0.04})`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 12% 16%, ${service.accent}26 0%, transparent 34%)`,
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "grid", gap: 10 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: nebulaVideoFonts.display,
                        fontSize: 42,
                        fontWeight: 700,
                        lineHeight: 0.98,
                        letterSpacing: "-0.05em",
                        color: nebulaVideoTokens.colors.silver,
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 22,
                        lineHeight: 1.42,
                        color: "rgba(232, 232, 240, 0.78)",
                      }}
                    >
                      {service.subtitle}
                    </p>
                  </div>

                  <Img
                    src={service.iconSrc}
                    alt=""
                    style={{
                      width: 112,
                      height: 112,
                      objectFit: "contain",
                      filter: "drop-shadow(0 18px 48px rgba(0,0,0,0.3))",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BrandLockupScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = progressBetween(frame, 0, 34);
  const symbolScale = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 16,
      stiffness: 92,
      mass: 1,
    },
  });
  const titleOpacity = progressBetween(frame, 8, 42, editorialEase);
  const captionOpacity = progressBetween(frame, 26, 58, editorialEase);
  const chipOpacity = progressBetween(frame, 42, 76, editorialEase);
  const planetFloat = interpolate(frame % 188, [0, 94, 188], [0, -22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "166px 104px 120px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.84fr)",
        gap: 72,
        alignItems: "center",
        opacity: enter,
      }}
    >
      <div style={{ display: "grid", gap: 30 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            transform: `scale(${0.88 + symbolScale * 0.12})`,
            transformOrigin: "left center",
          }}
        >
          <Img
            src={nebulaAssets.logo.symbolDark}
            alt=""
            style={{
              width: 76,
              height: 76,
              objectFit: "contain",
            }}
          />
          <p style={eyebrowStyle}>Nebula Studios</p>
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: nebulaVideoFonts.display,
            fontSize: 124,
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: "-0.07em",
            opacity: titleOpacity,
          }}
        >
          <span style={{ color: nebulaVideoTokens.colors.lilac }}>Nebula</span>
          <br />
          <span style={{ color: nebulaVideoTokens.colors.silver }}>
            Studios
          </span>
        </h2>

        <p style={{ ...bodyStyle, maxWidth: 760, opacity: captionOpacity }}>
          Construimos productos digitales a medida para empresas locales que
          necesitan digitalizar sus procesos.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            opacity: chipOpacity,
          }}
        >
          {editorialServices.map((service) => (
            <div key={service.slug} style={labelPillStyle}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  backgroundColor: service.accent,
                  boxShadow: `0 0 20px ${service.accent}66`,
                }}
              />
              {service.title}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 760,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "18% 0 auto 18%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(83, 74, 183, 0.28) 0%, rgba(83, 74, 183, 0) 74%)",
            filter: "blur(20px)",
          }}
        />

        <Img
          src={nebulaAssets.planets.planet6}
          alt=""
          style={{
            position: "absolute",
            top: 42,
            right: -14,
            width: 620,
            height: 620,
            objectFit: "contain",
            transform: `translate3d(0, ${planetFloat}px, 0)`,
            filter: "drop-shadow(0 34px 100px rgba(83, 74, 183, 0.34))",
          }}
        />

        <Img
          src={nebulaAssets.logo.horizontalDark}
          alt="Nebula Studios"
          style={{
            position: "absolute",
            left: 10,
            bottom: 110,
            width: 320,
            height: 48,
            objectFit: "contain",
            opacity: 0.82,
          }}
        />
      </div>
    </div>
  );
};

export const NebulaEditorialIntro = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  useNebulaVideoFonts();

  const masterOpacity = interpolate(
    frame,
    [0, 12, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    {
      easing: editorialEase,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: nebulaVideoTokens.colors.void,
        color: nebulaVideoTokens.colors.silver,
        fontFamily: nebulaVideoFonts.sans,
        overflow: "hidden",
        opacity: masterOpacity,
      }}
    >
      <CinematicBackdrop />
      <PersistentLockup />

      <Sequence from={0} durationInFrames={140} layout="none">
        <HeroPromiseScene />
      </Sequence>

      <Sequence from={116} durationInFrames={146} layout="none">
        <ServicesScene />
      </Sequence>

      <Sequence from={238} durationInFrames={122} layout="none">
        <BrandLockupScene />
      </Sequence>
    </AbsoluteFill>
  );
};
