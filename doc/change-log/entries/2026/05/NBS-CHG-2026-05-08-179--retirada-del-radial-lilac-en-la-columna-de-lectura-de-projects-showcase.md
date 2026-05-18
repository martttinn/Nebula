---
change_id: NBS-CHG-2026-05-08-179
date: 2026-05-08
title: Retirada del radial lilac en la columna de lectura de projects-showcase
group_id: NBS-TSK-2026-134
category: frontend
subcategories:
  - home
  - portfolio
  - design-system
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
  - components/home/projects-showcase/index.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run changes:validate
  - npm run lint
  - npm run typecheck
related_decisions:
---

# Resumen corto

Se elimina el gradiente circular lila decorativo del fondo de la columna de lectura en `projects-showcase`.

## Contexto / problema

La columna izquierda de los proyectos seguia usando un halo radial lila que recargaba la lectura y competia con la jerarquia del copy. Martin pidio limpiarla para que la atmosfera quede concentrada en el stage general y en el panel visual.

## Cambio realizado

- se retira el radial lila del fondo base de la columna de lectura desktop
- se alinea la variante movil simplificada con el mismo fondo lineal limpio
- se actualiza `DESIGN.md` para dejar explicito que el halo no debe vivir detras del copy

## Objetivo

Contener mejor la composicion de la columna de texto y reducir ruido atmosferico innecesario dentro del panel de proyecto.

## Impacto arquitectonico

Ajuste localizado en los backgrounds inline de `components/home/projects-showcase/index.tsx`. No altera la coreografia de scroll, solo el tratamiento de superficie del plano de lectura.

## Validacion

- `npm run changes:validate`
- `npm run lint`
- `npm run typecheck`

## Pendientes / limites

- el stage general y el panel visual derecho mantienen sus halos lilas actuales
- si despues se reduce tambien la atmosfera general de la seccion, debe tratarse como otra iteracion visual independiente

## Notas para presupuesto

Cambio visual pequeno pero visible en una surface publica premium. Ajusta la limpieza de lectura y el balance atmosferico sin reabrir layout ni motion.
