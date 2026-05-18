---
change_id: NBS-CHG-2026-05-08-173
date: 2026-05-08
title: Sustitucion del fondo del hero por DotField
group_id: NBS-TSK-2026-151
category: frontend
subcategories:
  - feature
origin: client-request
complexity: medium
scope: local
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
  - components/home/hero/index.tsx
  - components/home/hero/dot-field.tsx
  - components/home/hero/dot-field-shell.tsx
  - components/home/hero/dot-field-fallback.tsx
  - components/home/hero/grid-scan.tsx
  - components/home/hero/grid-scan-shell.tsx
  - components/home/hero/grid-scan-fallback.tsx
  - .agents/rules/01-project-context.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

El hero sustituye `GridScan` por un `DotField` canvas, elimina las capas decorativas que ensuciaban el fondo, deja de renderizar sus partículas flotantes locales y refuerza la visibilidad de la nueva trama lila sin perder la transición con la siguiente sección.

## Contexto / problema

Martín pidió reemplazar el fondo actual del hero por la receta `@react-bits/DotField-TS-CSS`. Después del primer swap, pidió además simplificar la atmósfera del bloque retirando el gradiente circular decorativo del fondo y sacando las partículas flotantes del runtime del hero.

## Cambio realizado

- se instala la receta solicitada con `npx shadcn@latest add @react-bits/DotField-TS-CSS`
- la implementación generada se recoloca dentro de la carpeta canónica `components/home/hero/` y se adapta al estilo del repo como `dot-field.tsx`, `dot-field-shell.tsx` y `dot-field-fallback.tsx`
- `Hero` deja de montar `GridScanShell` y pasa a usar `DotFieldShell`
- el nuevo `DotField` emite el mismo evento `hero-grid-ready` para no romper la coordinación actual del `Preloader`
- se retiran del árbol runtime del hero el radial decorativo y la capa `HeroParticles`
- se recolorea la trama para que los dots usen el lila de marca y se reduce el `dotSpacing` para aumentar la densidad visual
- el halo reactivo del cursor deja de usar lila y pasa a `Void` para fundirse con el fondo real del hero
- se amplian `cursorRadius` a `500` y `bulgeStrength` a `67` para que la deformación del campo sea más amplia y legible
- el gradiente del campo pasa a salir de un lila profundo Nebula y cerrar en `Lilac`, mientras `waveAmplitude` sube a `2`
- se sube además la opacidad efectiva del campo aumentando tanto la opacidad del shell como la alfa del gradiente de los dots
- se reaplica un gradiente lineal de cierre, pero limitado a la mitad inferior del hero para que la mitad superior no atenúe en absoluto el `DotField`
- se aumenta ligeramente la altura útil de la franja negra del gradiente para reforzar la transición con la siguiente sección
- se añade un gradiente radial negro/transparente solo detrás del bloque `heading + subheading` para asegurar legibilidad sin tapar el `DotField` del resto del hero
- se aumenta un poco el radio útil de ese halo radial para envolver mejor el bloque de copy
- la primitive `HeroParticles` no se borra del repo porque sigue reutilizada por otras secciones (`services-carousel` y `how-we-work`)
- se retiran del directorio del hero los archivos legacy de `GridScan`
- se actualizan `.agents/rules/01-project-context.md`, `.agents/decisions-log.md` y `doc/reference/technical-reference.md` para reflejar el nuevo runtime above-the-fold

## Objetivo

Reemplazar el fondo WebGL del hero por una alternativa más ligera y dejar la cabecera más sobria, sin romper la secuencia actual de preloader, copy y CTA.

## Impacto arquitectonico

El cambio se concentra en la familia `components/home/hero/` y mantiene la estrategia `Server Components first`: la página sigue siendo server-first y el fondo visual continúa aislado en una isla cliente pequeña. La orquestación superior del loader no cambia porque se preserva el contrato `hero-grid-ready`.

## Desglose denso

- `DotField` pasa a renderizar el fondo del hero sobre canvas con gradiente lineal y respuesta sutil al puntero, respetando `prefers-reduced-motion`
- la trama visible abandona el plateado inicial y pasa a una gama lila Nebula más coherente con el lenguaje de marca
- el `dotSpacing` baja para compactar el grid y hacer que el campo gane presencia sin reintroducir overlays decorativos
- el glow del puntero usa ahora el mismo color base del hero (`Void`) para que el efecto se lea como una depresión del fondo y no como un segundo acento cromático
- el área de influencia y la intensidad del bulge suben para que el campo reaccione con un gesto más amplio al cursor
- el gradiente del canvas ya no usa dos intensidades casi iguales del mismo lila: arranca en un lila profundo Nebula y transiciona al `Lilac` canónico `#534AB7`, con una ondulación más visible gracias a `waveAmplitude={2}`
- el hero vuelve a montar una capa lineal oscura, pero solo desde la mitad inferior hacia abajo; la mitad superior queda totalmente transparente y el cierre a `Void` se reserva para el tramo final del viewport
- esa capa de cierre gana ahora algo más de altura útil en su tramo negro para coser mejor con la sección siguiente sin invadir la mitad superior del hero
- la legibilidad del copy principal ya no depende de oscurecer el hero completo: un halo radial localizado protege solo la zona del titular y deja el campo de puntos visible en los alrededores
- ese halo radial gana además un poco más de diámetro y de caída para cubrir mejor el conjunto `heading + subheading`
- el componente se integra con `dynamic(..., { ssr: false })` y fallback propio para no subir lógica de navegador al shell server principal
- el hero deja de acumular dos capas atmosféricas paralelas (`DotField` + partículas); ahora el peso visual recae en el propio campo de puntos y en la tipografía
- aunque `particles.tsx` ya no participa en el hero, se conserva como primitive repo-local porque otras secciones públicas ya la consumen como atmósfera compartida
- la documentación operativa deja de describir el hero como un runtime `three` + `postprocessing` y pasa a reflejar el nuevo estado canvas

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- `DotField` sustituye el runtime del hero, pero las dependencias `three` y `postprocessing` siguen presentes en el repo por el estado general del worktree y porque esta tarea no pedía una limpieza de dependencias
- no se ha hecho en esta entrega una auditoría visual manual en navegador sobre mobile y desktop dentro del hilo; la validación cerrada aquí es estática y de build

## Notas para presupuesto

Refinamiento visual above-the-fold con sustitución controlada de primitive, limpieza del overlay y alineación documental del runtime público.
