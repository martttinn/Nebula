---
change_id: NBS-CHG-2026-05-07-161
date: 2026-05-07
title: Normalizacion de IDs duplicados en el historico del change-log
group_id: NBS-TSK-2026-146
category: docs
subcategories:
  - cleanup
  - drift
  - tooling
origin: internal-improvement
complexity: low
scope: repo-wide
user_visible: false
release_impacts:
  - developer-tooling
  - docs
architecture_layers:
  - docs
  - tooling
  - workflows
backend_sensitive: false
files_touched:
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-03-162--reversion-del-cta-contactar-al-estado-outlined-previo-al-hover-custom.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-03-163--reduccion-del-tamano-visible-de-las-particulas-del-hero.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-03-164--incremento-del-brillo-de-las-particulas-del-hero.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-03-165--reduccion-adicional-del-tamano-y-aumento-de-opacidad-de-las-particulas-del-hero.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-04-166--simplificacion-de-la-cabecera-visible-de-la-seccion-de-servicios.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-05-167--recuperacion-del-hide-on-scroll-del-navbar-desde-nebula-legacy.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-07-168--integracion-del-tooling-local-de-change-log.md
  - doc/change-log/groups/2026/NBS-TSK-2026-139.md
  - doc/change-log/groups/2026/NBS-TSK-2026-140.md
  - doc/change-log/groups/2026/NBS-TSK-2026-141.md
  - doc/change-log/groups/2026/NBS-TSK-2026-142.md
  - doc/change-log/groups/2026/NBS-TSK-2026-143.md
  - doc/change-log/groups/2026/NBS-TSK-2026-144.md
  - doc/change-log/groups/2026/NBS-TSK-2026-145.md
  - doc/change-log/groups/2026/NBS-TSK-2026-146.md
  - doc/change-log/index.md
verification:
  - npm run changes:validate
  - npm run changes:index
  - npm run changes:sync
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

Se normalizan los `change_id` duplicados del histórico del `change-log`, se reasignan sus grupos correctos y el validador vuelve a quedar limpio de warnings por colisión de IDs.

## Contexto / problema

Tras integrar el tooling local de `change-log`, `npm run changes:validate` seguía reportando seis `change_id` duplicados heredados del histórico. El problema no era solo numérico: varias de esas entradas también habían quedado asociadas a grupos semánticamente incorrectos, así que dejar un simple parche cosmético habría mantenido drift factual dentro del árbol documental.

## Cambio realizado

- se localizan las seis colisiones históricas reportadas por el validador
- se separan las entradas mezcladas en grupos incorrectos creando seis grupos canónicos nuevos
- se reasignan `change_id` y `group_id` a seis entradas históricas, preservando fecha, contenido y alcance funcional
- se corrige además la colisión nueva de la entrada `154` del tooling, moviéndola a `168` para respetar otra entrada ya presente en el worktree
- se deja un grupo de trabajo específico para documentar la propia normalización
- se regenera el índice derivado para reflejar ya los IDs y grupos saneados

## Objetivo

Dejar el `change-log` históricamente consistente, eliminar warnings del validador y evitar que el tooling nuevo conviva con deuda estructural evitable en su propio dataset.

## Impacto arquitectonico

Cambio interno en el subsistema documental. No altera runtime, frontend ni backend, pero sanea un contrato repo-local que ahora sí puede considerarse verificable como fuente operativa.

## Desglose denso

- las colisiones históricas afectaban a seis entradas entre `2026-05-03`, `2026-05-04` y `2026-05-05`
- en vez de mezclar dos cambios distintos dentro del mismo grupo, la normalización crea nuevos grupos `140` a `145` para reflejar cada tarea real
- los IDs reubicados pasan a `162`-`167`, dejando intactas las entradas que ya coincidían con el título y objetivo de sus grupos originales
- la tarea detecta además una colisión adicional en el worktree para `NBS-CHG-2026-05-07-154` y desplaza la entrada de tooling a `168`
- la entrega demuestra que el tooling integrado en la tarea anterior sirve para detectar drift histórico real y no solo para generar archivos nuevos

## Validacion

- `npm run changes:validate`
- `npm run changes:index`
- `npm run changes:sync`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- la normalización no persigue homogeneizar todo el estilo legacy del histórico; ese trabajo sería una tarea aparte y deliberadamente más amplia
- si existe alguna referencia manual externa al repo usando los IDs antiguos normalizados, deberá actualizarse fuera de este árbol

## Notas para presupuesto

Entrega interna de saneamiento documental y DX: no añade funcionalidad pública, pero elimina drift operativo y refuerza la fiabilidad del subsistema de `change-log`.
