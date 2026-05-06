---
change_id: NBS-CHG-2026-05-06-140
date: 2026-05-06
title: Modularizacion interna de la seccion value proposition
group_id: NBS-TSK-2026-126
category: frontend
subcategories:
  - refactor
origin: client-request
complexity: medium
scope: local
user_visible: false
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/value-proposition-section/**
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La sección `value-proposition` deja de estar repartida entre un wrapper, un stage sticky y un CSS module sueltos y pasa a una carpeta única que agrupa entrada pública, contenido, ornamentos y lógica editorial.

## Contexto / problema

La banda de benefits estaba fragmentada entre `value-proposition-section.tsx`, `value-proposition-statements.tsx` y `value-proposition-ornaments.module.css`. Aunque el scope era más pequeño que en otras secciones, la responsabilidad seguía dispersa y no quedaba claro dónde vivían el copy, los tiempos del stage y la capa ornamental.

## Cambio realizado

- se sustituye `components/home/value-proposition-section.tsx` por la carpeta `components/home/value-proposition-section/`
- `index.tsx` mantiene la API pública `ValuePropositionSection`
- `statements.tsx` concentra la lógica del stage sticky, el reduced motion y el coloreado palabra a palabra
- `content.ts` agrupa frases, overrides cromáticos, altura del stage y configuración de ornamentos
- `ornaments.module.css` permanece como hoja aislada pero ya dentro del mismo boundary de sección
- se absorbe y preserva el ajuste ya presente en el worktree sobre `stickyStageHeight`
- `doc/reference/technical-reference.md` se actualiza para reflejar la nueva estructura

## Objetivo

Dejar la sección de benefits más cohesionada y fácil de iterar sin repartir cambios de copy, timing, motion u ornamentos entre archivos desconectados.

## Impacto arquitectonico

Refactorización local de frontend. El import público desde `app/page.tsx` permanece estable y la primitive compartida `WordByWordColorChange` sigue siendo la misma.

## Desglose denso

- el punto de entrada `@/components/home/value-proposition-section` no cambia
- la configuración editorial y ornamental deja de estar mezclada con imports de la home y pasa a un único archivo de contenido
- el CSS específico de benefits queda adjunto a su sección en lugar de vivir como artefacto paralelo en el directorio raíz de `home`
- la referencia técnica deja de apuntar a rutas ya inexistentes y describe el boundary consolidado resultante

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no existe regresión visual automatizada del scroll editorial; la validación final de timing y lectura sigue siendo manual
- `DESIGN.md` no requiere cambios porque no se altera el canon visual de la banda
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refactorización técnica de mantenimiento orientada a reducir fricción al tocar una sección pública donde copy, motion y art direction están especialmente acoplados.
