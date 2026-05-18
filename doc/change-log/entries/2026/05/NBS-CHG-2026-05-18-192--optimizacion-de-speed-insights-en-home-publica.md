---
change_id: NBS-CHG-2026-05-18-192
date: 2026-05-18
title: Optimizacion de Speed Insights en home publica
group_id: NBS-TSK-2026-168
category: frontend
subcategories:
  - performance
  - motion
  - diagnostics
origin: client-request
complexity: medium
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/ui/preloader.tsx
  - components/home/hero/lead.tsx
  - components/home/services-carousel/index.tsx
  - components/home/how-we-work/index.tsx
  - components/home/testimonials/index.tsx
  - components/home/testimonials/grid-distortion-shell.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-18-192--optimizacion-de-speed-insights-en-home-publica.md
  - doc/change-log/groups/2026/NBS-TSK-2026-168.md
verification:
  - documentacion oficial Vercel Speed Insights consultada 2026-05-18
  - curl -I https://somosnebula.com
  - Lighthouse local desktop antes y despues
  - Playwright CLI layout-shift observer durante scroll sintetico
  - npm run lint
  - npm run typecheck
  - npm run build
  - npx react-doctor@latest --offline --full --no-lint --json --json-compact
  - npm run changes:sync
related_decisions:
  - La home prioriza estabilidad y LCP de campo frente a ornamento above-the-fold
---

# Resumen corto

Se optimizo la home publica para atacar los dos sintomas principales mostrados por Vercel Speed Insights: LCP alto y CLS de sesion muy elevado.

## Contexto / problema

Martín mostro el panel de Vercel Speed Insights de produccion para desktop en los ultimos 7 dias: `RES 51`, `FCP 2.36s`, `LCP 4.62s`, `INP 48ms`, `CLS 1.07` y `TTFB 0.48s`.

La lectura inicial es que servidor e interaccion no eran el problema principal: `TTFB` e `INP` estaban en verde. El cuello de botella probable estaba en frontend, motion y estabilidad visual durante la sesion.

## Cambio realizado

- `Preloader` reduce su duracion minima de branding, limita el timeout de seguridad y lanza `hero-intro-start` antes de terminar todo el fade de salida
- el heading principal del hero deja de ocultarse detras de `SplitText` y se renderiza directamente para que el elemento LCP sea pintable desde el primer render
- el subheading mantiene `SplitText`, pero con timings mas cortos y coordinacion posterior al inicio del hero
- `HeroParticles` se retira de `services-carousel`, `how-we-work` y `testimonials`, porque la medicion de `layout-shift` la marcaba como fuente dominante de CLS durante scroll
- `GridDistortion` se monta solo cuando la card final de contacto se aproxima al viewport; mientras tanto se muestra un fallback estatico equivalente
- se actualizan `DESIGN.md`, decisions log, referencia tecnica y change-log para dejar trazado el canon de performance

## Objetivo

Mejorar la experiencia real medida por Vercel sin quitar la identidad Nebula ni reabrir una remaquetacion completa de la landing.

## Impacto arquitectonico

El cambio se queda en componentes de home y documentacion. No toca backend, rutas, metadata SEO, dependencias, storage, auth ni contratos de datos. La arquitectura de secciones canonicas en `components/home/*/index.tsx` se mantiene.

La decision de fondo es separar ornamento visual de la superficie critica de Core Web Vitals: el hero debe pintar su mensaje principal pronto, los efectos below-the-fold deben cargarse por proximidad y las capas full-viewport no deben montarse en stages sticky/fixed si generan desplazamientos acumulados.

## Desglose denso

La comprobacion de produccion con `curl -I https://somosnebula.com` devolvio respuesta cacheada por Vercel y prerender estatico, por lo que no habia evidencia de cuello de botella server-side.

La auditoria local previa con Lighthouse desktop indicaba un payload inicial aproximado de `1.894MiB`, `FCP 1.8s`, `LCP 5.8s`, `TBT 160ms` y `CLS 0` en carga inicial. El LCP estaba asociado al bloque de heading del hero, y la red cargaba de forma temprana `public/backgrounds/cta-background.png`, un asset below-the-fold de aproximadamente `1.15MiB`.

La medicion especifica de CLS con Playwright y `PerformanceObserver` durante scroll sintetico explico mejor el dato de Vercel que Lighthouse de carga: el CLS acumulado durante recorrido era aproximadamente `1.94`, con la capa `HeroParticles` como fuente dominante en stages posteriores. Tras retirarla, el mismo recorrido bajo a aproximadamente `0.115`; el residuo queda localizado en `projects-showcase` y se puede tratar como optimizacion independiente.

## Validacion

- documentacion oficial de Vercel Speed Insights consultada el `2026-05-18`
- `curl -I https://somosnebula.com` confirmo `x-vercel-cache: HIT` y `x-nextjs-prerender: 1`
- Lighthouse local desktop despues del primer ajuste: payload inicial aproximado `617KiB`, `FCP 1.1s`, `LCP 5.0s`, `TBT 310ms`, `CLS 0`
- Lighthouse local desktop despues de dejar el H1 estatico: payload inicial aproximado `617KiB`, `FCP 1.1s`, `LCP simulado 4.5s`, `TBT 30ms`, `CLS 0`; la traza observada reporto paint/LCP temprano, pero el score simulado de Lighthouse debe tratarse como senal de laboratorio, no como dato de campo definitivo
- Playwright CLI con `PerformanceObserver`: CLS sintetico de scroll aprox. `1.94` antes y `0.115` despues
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npx react-doctor@latest --offline --full --no-lint --json --json-compact`
- `npm run changes:sync`

## Pendientes / limites

La mejora real en Vercel Speed Insights solo se confirma tras desplegar y recibir nuevas visitas reales. La captura original tenia una muestra desktop reducida, por lo que el percentil puede tardar en estabilizarse.

Queda fuera de este cambio la optimizacion del chunk lazy generado por `tech-stack-icons`, que sigue siendo grande aunque hoy no aparezca como causa directa del primer render.

## Notas para presupuesto

Optimización de performance con valor directo de producto: reduce friccion de primera impresion, mejora estabilidad visual y deja reglas documentales para no reintroducir el mismo problema en futuras iteraciones visuales. Mezcla diagnostico, frontend runtime, motion y mantenimiento documental.
