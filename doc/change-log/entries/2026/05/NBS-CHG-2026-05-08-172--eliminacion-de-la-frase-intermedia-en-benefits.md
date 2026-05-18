---
change_id: NBS-CHG-2026-05-08-172
date: 2026-05-08
title: Eliminacion de la frase intermedia en benefits
group_id: NBS-TSK-2026-150
category: frontend
subcategories:
  - benefits
  - copy
  - home
origin: client-request
complexity: low
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
  - components/home/value-proposition-section/content.ts
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run changes:validate
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

La banda de benefits deja de mostrar tres statements y pasa a quedarse solo con la primera y la última frase del bloque.

## Contexto / problema

Martín pidió simplificar la sección de benefits eliminando la frase central y conservando únicamente la primera y la última. Mantener la frase intermedia habría seguido alargando innecesariamente la secuencia sticky.

## Cambio realizado

- se elimina del catálogo visible la frase `Recupera el tiempo perdido en tareas repetitivas.`
- se limpia el override cromático asociado a ese statement
- se elimina también su pareja de `abstract-icons` para que el runtime no siga cargando una capa ornamental ya huérfana
- la altura del stage se recalcula automáticamente al depender de `valuePhrases.length`
- se actualizan el `decision log` y la referencia técnica para reflejar que la banda ya no usa tres frases activas

## Objetivo

Hacer que la sección de propuesta de valor sea más concisa y que el scroll editorial entre hero y servicios se perciba más directo.

## Impacto arquitectonico

Ajuste localizado en el catálogo `content.ts` de `value-proposition-section`. No cambia la primitive sticky ni la lógica de coloreado; solo reduce el número de statements que esa lógica recorre.

## Desglose denso

- la primera frase se mantiene como apertura del bloque
- la antigua tercera frase pasa a ser ahora el segundo y último statement del stage
- al desaparecer un statement completo, el sticky runway queda naturalmente más corto sin introducir nuevos números mágicos
- la capa ornamental sigue siendo consistente porque el catálogo visible y el catálogo de ornamentos vuelven a tener la misma cardinalidad

## Validacion

- `npm run changes:validate`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el recorte no reequilibra visualmente las anclas de las dos frases restantes más allá de eliminar la pareja central; si quieres una composición más trabajada, el siguiente paso sería retocar posiciones y tamaños para este nuevo estado de dos statements

## Notas para presupuesto

Refinamiento visible de copy y ritmo narrativo en una sección pública ya integrada.
