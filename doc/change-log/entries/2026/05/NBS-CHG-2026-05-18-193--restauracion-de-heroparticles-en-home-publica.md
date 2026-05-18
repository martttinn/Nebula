---
change_id: NBS-CHG-2026-05-18-193
date: 2026-05-18
title: Restauracion de HeroParticles en home publica
group_id: NBS-TSK-2026-169
category: frontend
subcategories:
  - atmosphere
  - motion
  - visual-system
origin: client-request
complexity: low
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
  - components/home/services-carousel/index.tsx
  - components/home/how-we-work/index.tsx
  - components/home/testimonials/index.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-18-193--restauracion-de-heroparticles-en-home-publica.md
  - doc/change-log/groups/2026/NBS-TSK-2026-169.md
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - HeroParticles se restaura como atmosfera de continuidad
---

# Resumen corto

Se restauro `HeroParticles` en servicios, proceso y testimonials para recuperar la continuidad atmosferica de la home.

## Contexto / problema

Tras la optimizacion de Speed Insights, Martín pidio restaurar explicitamente `HeroParticles`. El cambio anterior habia retirado esta capa por impacto medido en CLS de sesion, pero tambien reducia una parte de la firma visual atmosferica de Nebula.

## Cambio realizado

- `services-carousel` vuelve a montar `HeroParticles` en desktop y en la variante movil
- `how-we-work` vuelve a montar `HeroParticles` sobre el fondo del bloque y detras del contenido
- `testimonials` vuelve a montar `HeroParticles` en el stage desktop y en la degradacion movil/tablet
- `DESIGN.md`, decisions log y referencia tecnica vuelven a describir esa capa como parte del runtime actual

## Objetivo

Recuperar la atmosfera visual previa sin revertir el resto de optimizaciones ya conservadas: H1 pintable, preloader mas corto y carga bajo demanda de `GridDistortion`.

## Impacto arquitectonico

El cambio solo afecta a secciones de `components/home/` y documentacion. No toca rutas, backend, datos, auth, dependencias ni contratos externos.

## Desglose denso

La restauracion reintroduce la primitive `HeroParticles` importada desde `components/home/hero/particles` en tres familias de seccion. La primitive no se duplica ni se modifica; se recupera el consumo compartido para mantener una unica firma atmosferica entre bloques.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

No se repite una auditoria de Speed Insights de campo porque requiere deploy y trafico real. La medicion local previa indicaba que esta capa podia elevar el CLS durante scroll sintetico; queda aceptado como trade-off visual por peticion explicita.

## Notas para presupuesto

Restauracion visual acotada con actualizacion documental asociada. El valor se concentra en continuidad de marca y atmosfera; el riesgo principal es rendimiento percibido en sesiones con scroll profundo.
