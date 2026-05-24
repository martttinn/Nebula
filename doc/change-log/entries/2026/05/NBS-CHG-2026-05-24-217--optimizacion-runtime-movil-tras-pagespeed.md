---
change_id: NBS-CHG-2026-05-24-217
date: 2026-05-24
title: Optimizacion de runtime movil tras PageSpeed
group_id: NBS-TSK-2026-193
category: frontend
subcategories:
  - performance
  - hydration
  - scroll-interactions
  - runtime
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
  - web
backend_sensitive: false
files_touched:
  - app/layout.tsx
  - components/layout/lenis-provider.tsx
  - components/layout/vercel-observability.tsx
  - components/layout/scroll-progress-bar.tsx
  - components/ui/preloader.tsx
  - components/home/services-carousel/index.tsx
  - components/home/services-carousel/use-section-scroll-progress.ts
  - components/home/projects-showcase/index.tsx
  - components/home/testimonials/index.tsx
  - lib/browser-idle.ts
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-24-217--optimizacion-runtime-movil-tras-pagespeed.md
  - doc/change-log/groups/2026/NBS-TSK-2026-193.md
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - inspeccion de page_client-reference-manifest.js
  - inspeccion de chunks .next/static/chunks
  - verificacion local Playwright del ciclo unico de preloader
related_decisions:
  - Trabajo no visual se desplaza fuera del arranque movil
---

# Resumen corto

Se aplica un segundo pase conservador de performance mobile: se desplaza trabajo no visual fuera del arranque inmediato y se evita que mobile ejecute calculos desktop ocultos.

## Contexto / problema

Martín compartio un analisis PageSpeed Insights donde los sintomas accionables seguian centrados en JavaScript, trabajo de main thread, JS no usado y reflows forzados. El ahorro estimado por CSS render-blocking era pequeno (`30ms`) y el aviso de JavaScript antiguo tenia retorno bajo (`14KiB`), por lo que el cambio se enfoca en trabajo runtime sin tocar la composicion visual.

## Cambio realizado

- `Lenis` deja de importarse de forma estatica desde el root layout y se instancia por idle en `LenisProvider` sin reenvolver el arbol React
- Vercel Analytics y Speed Insights pasan a una isla `VercelObservability` que importa ambos modulos por idle
- `Preloader` mantiene su scroll lock propio, deja de depender de `useLenis` y evita una segunda ejecucion causada por remount tardio del provider
- `ScrollProgressBar` deja de usar estado React para cada frame y escribe `transform: scaleX(...)` sobre un ref
- `services-carousel`, `projects-showcase` y `testimonials` cachean metricas de seccion y reducen lecturas geometricas durante scroll
- mobile deja de activar listeners/calculos desktop ocultos en servicios y proyectos
- se anade `lib/browser-idle.ts` como helper compartido para trabajo no critico
- se actualizan decisions log, referencia tecnica y change-log

## Objetivo

Reducir coste de hidratacion, evaluacion de JavaScript, reflows y renders por frame manteniendo el resultado visual actual.

## Impacto arquitectonico

Impacto acotado al runtime cliente de layout y secciones publicas. No toca rutas, metadata SEO, copy comercial, identidad visual, backend, Supabase, auth, datos ni dependencias.

## Desglose denso

El root layout ya no importa directamente los paquetes de observabilidad ni `Lenis` en la ruta estatica inicial. En su lugar, mantiene islas pequenas que cargan esos modulos cuando el navegador tiene margen o vence un timeout corto. Esto conserva la funcionalidad, pero evita incluir trabajo no visual en la ruta de arranque inmediato.

`LenisProvider` mantiene siempre estable el retorno de `children` y crea la instancia de `Lenis` de forma imperativa. La primera version del pase cargaba `lenis/react` por idle y cambiaba el wrapper de la home cuando resolvia el import, lo que podia remontar `Preloader` y mostrarlo dos veces antes del contenido. El bootstrap imperativo conserva la carga diferida sin cambiar la jerarquia React.

El `Preloader` ya bloqueaba scroll mediante estilos y listeners propios; por tanto, la dependencia directa de `useLenis` no era necesaria para preservar el resultado visual. Al retirarla se evita que el loader arrastre `lenis/react`.

El indicador global de progreso de scroll mantiene la misma apariencia, pero deja de renderizar React en cada frame del suavizado. El fill se actualiza con `transform`, que es la propiedad que ya definia el resultado visual.

En servicios y proyectos se separa el coste por viewport: el markup responsive sigue existiendo, pero en mobile no se activan los listeners y mediciones de la variante desktop oculta. En proyectos se sustituye el snap basado en `Lenis` por una animacion local de `window.scrollTo` con la misma curva y duracion configuradas para no depender del paquete de scroll suave.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- inspeccion de chunks: `lenis`, `@vercel/analytics` y `@vercel/speed-insights` quedan en chunks separados de carga diferida, no como imports estaticos directos de `app/layout.tsx`
- inspeccion de entrypoints: el layout mantiene una isla pequena para orquestar carga idle, mientras los paquetes pesados quedan fuera del import estatico
- verificacion local con Playwright: el overlay de preloader aparece una sola vez y no vuelve a montarse cuando `Lenis` termina de cargar por idle

## Pendientes / limites

La mejora real en PageSpeed del dominio oficial solo se confirma tras desplegar y medir de nuevo. El split completo de secciones below-the-fold no se aplica en este pase para no introducir placeholders o fallbacks que puedan cambiar la experiencia visual durante scroll rapido.

## Notas para presupuesto

Optimizacion de runtime movil sin rediseño: reduce trabajo no critico y reflows potenciales conservando la direccion visual y la narrativa actual de la home.
