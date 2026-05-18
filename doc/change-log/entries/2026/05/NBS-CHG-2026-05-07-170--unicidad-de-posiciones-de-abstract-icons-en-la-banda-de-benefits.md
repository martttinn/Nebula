---
change_id: NBS-CHG-2026-05-07-170
date: 2026-05-07
title: Unicidad de posiciones de abstract-icons en la banda de benefits
group_id: NBS-TSK-2026-149
category: frontend
subcategories:
  - home
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
backend_sensitive: false
files_touched:
  - components/home/value-proposition-section/content.ts
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
  - 2026-05-05 — La banda de benefits añade dos `abstract-icons` sincronizados por frase
---

# Resumen corto

La banda de benefits ajusta sus `abstract-icons` para que ninguna frase repita la misma posición ornamental y añade una validación explícita contra duplicados futuros.

## Contexto / problema

Las frases de la banda de propuesta de valor ya usaban dos `abstract-icons` sincronizados, pero algunas anclas espaciales seguían repitiéndose entre statements distintos, sobre todo en móvil. Martín pidió eliminar esa repetición para que cada frase tuviera una composición propia.

## Cambio realizado

- se reajustan las posiciones desktop y mobile de los seis ornamentos para que ninguna frase comparta la misma ancla espacial con otra
- se añade una validación repo-local en `content.ts` que calcula firmas de posición por viewport y lanza error si aparece un duplicado entre frases
- se actualizan `DESIGN.md`, `.agents/decisions-log.md` y la referencia técnica para fijar esta restricción como parte del comportamiento canónico de benefits

## Objetivo

Evitar repetición visual en una de las secciones editoriales más cortas y visibles de la home, y blindar el catálogo ornamental frente a regresiones futuras.

## Impacto arquitectonico

El cambio no altera la arquitectura pública de la home, pero endurece el contrato del catálogo estático de `value-proposition-section`: las posiciones ornamentales dejan de ser solo datos visuales y pasan a estar validadas como invariant del sistema.

## Desglose denso

- la unicidad se evalúa por firma de anclaje, no por asset o rotación: si dos frases comparten el mismo `top/left/right` efectivo en un mismo viewport, el módulo falla
- la validación se ejecuta tanto para desktop como para móvil, usando los fallbacks reales de `topMobile`, `leftMobile` y `rightMobile`
- la frase 1 mantiene una composición relativamente contenida y cercana a los bordes
- la frase 2 desplaza sus masas a posiciones más interiores para separarse con claridad de la primera
- la frase 3 conserva el patrón invertido, pero con offsets propios para no reciclar la misma lectura espacial

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- la validación evita duplicados exactos de anclaje, pero no evalúa “parecidos” subjetivos; si más adelante quieres una regla todavía más estricta, habría que definir una distancia mínima visual entre posiciones
- la revisión visual fina en móvil sigue dependiendo de comprobación manual porque los `abstract-icons` son sensibles a densidad de copy y viewport real

## Notas para presupuesto

Entrega visible de bajo coste y alto impacto perceptivo: corrige repetición ornamental en una sección premium, mejora la sensación de composición deliberada y añade hardening para que el problema no reaparezca.
