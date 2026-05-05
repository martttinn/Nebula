"use client";

import { BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

export type GridScanProps = {
  className?: string;
  lineThickness?: number;
  linesColor?: string;
  scanColor?: string;
  gridScale?: number;
  lineStyle?: "solid" | "dashed" | "dotted";
  lineJitter?: number;
  scanOpacity?: number;
  scanDirection?: "forward" | "backward" | "pingpong";
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomSmoothing?: number;
  chromaticAberration?: number;
  noiseIntensity?: number;
  scanGlow?: number;
  scanSoftness?: number;
  scanPhaseTaper?: number;
  scanDuration?: number;
  scanDelay?: number;
};

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uLineStyle;
uniform float uLineJitter;
uniform float uScanOpacity;
uniform float uScanDirection;
uniform float uNoise;
uniform float uBloomOpacity;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uPhaseTaper;
uniform float uScanDuration;
uniform float uScanDelay;

varying vec2 vUv;

float smoother01(float a, float b, float x) {
  float t = clamp((x - a) / max(0.00001, b - a), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

  vec3 ro = vec3(0.0);
  vec3 rd = normalize(vec3(p, 2.0));

  float cR = cos(uTilt);
  float sR = sin(uTilt);
  rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

  float cY = cos(uYaw);
  float sY = sin(uYaw);
  rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

  vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
  rd.xy += skew * rd.z;

  float minT = 1e20;
  float hitIsY = 1.0;
  float gridScale = max(0.00001, uGridScale);
  vec2 gridUV = vec2(0.0);

  for (int i = 0; i < 4; i++) {
    float isY = float(i < 2);
    float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
    float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
    float den = isY * rd.y + (1.0 - isY) * rd.x;
    float t = num / den;
    vec3 h = ro + rd * t;

    float depthBoost = smoothstep(0.0, 3.0, h.z);
    h.xy += skew * 0.15 * depthBoost;

    bool useHit = t > 0.0 && t < minT;
    gridUV = useHit ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
    minT = useHit ? t : minT;
    hitIsY = useHit ? isY : hitIsY;
  }

  vec3 hit = ro + rd * minT;
  float distToHit = length(hit - ro);
  float fade = exp(-distToHit * 2.0);

  if (uLineJitter > 0.0) {
    vec2 jitter = vec2(
      sin(gridUV.y * 2.7 + iTime * 1.8),
      cos(gridUV.x * 2.3 - iTime * 1.6)
    ) * (0.15 * clamp(uLineJitter, 0.0, 1.0));
    gridUV += jitter;
  }

  float fx = fract(gridUV.x);
  float fy = fract(gridUV.y);
  float ax = min(fx, 1.0 - fx);
  float ay = min(fy, 1.0 - fy);
  float wx = fwidth(gridUV.x);
  float wy = fwidth(gridUV.y);

  float halfPx = max(0.0, uLineThickness) * 0.5;
  float tx = halfPx * wx;
  float ty = halfPx * wy;

  float lineX = 1.0 - smoothstep(tx, tx + wx, ax);
  float lineY = 1.0 - smoothstep(ty, ty + wy, ay);

  if (uLineStyle > 0.5) {
    float dashRepeat = 4.0;
    float dashDuty = 0.5;
    float vy = fract(gridUV.y * dashRepeat);
    float vx = fract(gridUV.x * dashRepeat);
    float dashMaskY = step(vy, dashDuty);
    float dashMaskX = step(vx, dashDuty);

    if (uLineStyle < 1.5) {
      lineX *= dashMaskY;
      lineY *= dashMaskX;
    } else {
      float dotRepeat = 6.0;
      float dotWidth = 0.18;
      float cy = abs(fract(gridUV.y * dotRepeat) - 0.5);
      float cx = abs(fract(gridUV.x * dotRepeat) - 0.5);
      float dotMaskY = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.y * dotRepeat), cy);
      float dotMaskX = 1.0 - smoothstep(dotWidth, dotWidth + fwidth(gridUV.x * dotRepeat), cx);
      lineX *= dotMaskY;
      lineY *= dotMaskX;
    }
  }

  float lineMask = max(lineX, lineY);

  float cycle = max(0.05, uScanDuration) + max(0.0, uScanDelay);
  float tCycle = mod(iTime, cycle);
  float phase = clamp((tCycle - max(0.0, uScanDelay)) / max(0.05, uScanDuration), 0.0, 1.0);

  if (uScanDirection > 0.5 && uScanDirection < 1.5) {
    phase = 1.0 - phase;
  } else if (uScanDirection > 1.5) {
    float bounce = mod(max(0.0, iTime - max(0.0, uScanDelay)), 2.0 * max(0.05, uScanDuration));
    phase = bounce < max(0.05, uScanDuration)
      ? bounce / max(0.05, uScanDuration)
      : 1.0 - (bounce - max(0.05, uScanDuration)) / max(0.05, uScanDuration);
  }

  float scanZ = phase * 2.0;
  float dz = abs(hit.z - scanZ);
  float sigma = max(0.001, 0.18 * max(0.1, uScanGlow) * max(0.1, uScanSoftness));
  float sigmaAura = sigma * 2.0;
  float taper = clamp(uPhaseTaper, 0.0, 0.49);
  float phaseWindow = smoother01(0.0, taper, phase) * (1.0 - smoother01(1.0 - taper, 1.0, phase));

  float scanPulse = exp(-0.5 * (dz * dz) / (sigma * sigma)) * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);
  float scanAura = exp(-0.5 * (dz * dz) / (sigmaAura * sigmaAura)) * phaseWindow * 0.25 * clamp(uScanOpacity, 0.0, 1.0);

  vec3 gridColor = uLinesColor * lineMask * fade;
  vec3 pulseColor = uScanColor * scanPulse;
  vec3 auraColor = uScanColor * scanAura;

  float noise = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898, 78.233))) * 43758.5453123);
  vec3 color = clamp(gridColor + pulseColor + auraColor + (noise - 0.5) * uNoise, 0.0, 1.0);

  float haloX = 1.0 - smoothstep(tx * 2.0, tx * 2.0 + wx * 2.0, ax);
  float haloY = 1.0 - smoothstep(ty * 2.0, ty * 2.0 + wy * 2.0, ay);
  float halo = max(haloX, haloY) * fade;
  float alpha = max(max(lineMask, scanPulse), halo * clamp(uBloomOpacity, 0.0, 1.0));

  fragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}

void main() {
  vec4 color;
  mainImage(color, vUv * iResolution.xy);
  gl_FragColor = color;
}
`;

export function GridScan({
  className,
  lineThickness = 1,
  linesColor = "#24243A",
  scanColor = "#B5B1E3",
  gridScale = 0.1,
  lineStyle = "solid",
  lineJitter = 0.08,
  scanOpacity = 0.28,
  scanDirection = "pingpong",
  bloomIntensity = 0.16,
  bloomThreshold = 0.22,
  bloomSmoothing = 0.18,
  chromaticAberration = 0.0016,
  noiseIntensity = 0.008,
  scanGlow = 0.62,
  scanSoftness = 1.35,
  scanPhaseTaper = 0.22,
  scanDuration = 2.6,
  scanDelay = 1.15,
}: GridScanProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: {
        value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio()),
      },
      iTime: { value: 0 },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uTilt: { value: 0 },
      uYaw: { value: 0 },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: toLinearColor(linesColor) },
      uScanColor: { value: toLinearColor(scanColor) },
      uGridScale: { value: gridScale },
      uLineStyle: { value: lineStyle === "dashed" ? 1 : lineStyle === "dotted" ? 2 : 0 },
      uLineJitter: { value: Math.max(0, Math.min(1, lineJitter)) },
      uScanOpacity: { value: scanOpacity },
      uScanDirection: { value: scanDirection === "backward" ? 1 : scanDirection === "pingpong" ? 2 : 0 },
      uNoise: { value: noiseIntensity },
      uBloomOpacity: { value: bloomIntensity },
      uScanGlow: { value: scanGlow },
      uScanSoftness: { value: scanSoftness },
      uPhaseTaper: { value: scanPhaseTaper },
      uScanDuration: { value: scanDuration },
      uScanDelay: { value: scanDelay },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new BloomEffect({
      intensity: 1,
      luminanceThreshold: bloomThreshold,
      luminanceSmoothing: bloomSmoothing,
    });

    bloom.blendMode.opacity.value = Math.max(0, bloomIntensity);

    const chromatic = new ChromaticAberrationEffect({
      offset: new THREE.Vector2(chromaticAberration, chromaticAberration),
      radialModulation: true,
      modulationOffset: 0,
    });

    const effectPass = new EffectPass(camera, bloom, chromatic);
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);

    const renderFrame = (time: number) => {
      pointerCurrent.lerp(pointerTarget, prefersReducedMotion ? 1 : 0.08);

      uniforms.iTime.value = time;
      uniforms.uSkew.value.set(pointerCurrent.x * 0.1, pointerCurrent.y * 0.12);
      uniforms.uTilt.value = pointerCurrent.x * 0.16;
      uniforms.uYaw.value = THREE.MathUtils.clamp(pointerCurrent.x * 0.22, -0.32, 0.32);

      renderer.clear(true, true, true);
      composer.render(prefersReducedMotion ? 0 : 1 / 60);
    };

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
      uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, renderer.getPixelRatio());
      renderFrame(performance.now() / 1000);
    };

    let animationFrameId = 0;

    window.addEventListener("resize", handleResize);

    if (prefersReducedMotion) {
      renderFrame(0);
      window.dispatchEvent(new CustomEvent("hero-grid-ready"));
    } else {
      let readyEmitted = false;
      const loopWithReady = () => {
        renderFrame(performance.now() / 1000);

        if (!readyEmitted) {
          readyEmitted = true;
          window.dispatchEvent(new CustomEvent("hero-grid-ready"));
        }

        animationFrameId = window.requestAnimationFrame(loopWithReady);
      };

      animationFrameId = window.requestAnimationFrame(loopWithReady);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      composer.dispose();
      material.dispose();
      (quad.geometry as THREE.BufferGeometry).dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    bloomIntensity,
    bloomSmoothing,
    bloomThreshold,
    chromaticAberration,
    gridScale,
    lineJitter,
    lineStyle,
    lineThickness,
    linesColor,
    noiseIntensity,
    scanColor,
    scanDelay,
    scanDirection,
    scanDuration,
    scanGlow,
    scanOpacity,
    scanPhaseTaper,
    scanSoftness,
  ]);

  return <div aria-hidden="true" className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} ref={containerRef} />;
}

function toLinearColor(hex: string) {
  return new THREE.Color(hex).convertSRGBToLinear();
}
