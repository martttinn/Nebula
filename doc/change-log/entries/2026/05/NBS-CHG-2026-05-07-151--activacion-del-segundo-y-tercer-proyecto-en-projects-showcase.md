---
change_id: NBS-CHG-2026-05-07-151
date: 2026-05-07
title: Activacion del segundo y tercer proyecto en projects-showcase
group_id: NBS-TSK-2026-134
category: frontend
subcategories:
  - home
  - portfolio
  - motion
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
  - components/home/projects-showcase/**
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La sección `Proyectos destacados` deja de mostrar un solo caso y pasa a encadenar tres proyectos full-screen sobre el mismo stage de scroll.

## Contexto / problema

Tras estabilizar el heading pinned y el primer takeover de proyecto, el runtime seguía cortando la narrativa de portfolio demasiado pronto. El segundo y tercer proyecto aún no existían en la coreografía real, aunque el canon documental ya los contemplaba como intención final.

## Cambio realizado

- se sustituye el objeto único de proyecto por un catálogo local de tres casos
- se amplía la timeline del stage para dejar más runway al heading y para secuenciar tres paneles completos
- cada proyecto entra desde abajo, ocupa el viewport y queda cubierto por el siguiente mediante orden de apilado
- se añaden los casos `Future Nova` y `Nebula Studios` con copy repo-safe y stacks tipados
- se actualizan `DESIGN.md`, `.agents/decisions-log.md` y la referencia técnica para reflejar que el runtime ya no está en fase de un solo panel

## Objetivo

Completar la narrativa principal de portfolio en la home y acercar el runtime real a la intención original de `projects-showcase` sin inventar un portfolio público más profundo de lo que existe.

## Impacto arquitectonico

La primitive `projects-showcase` mantiene una única isla cliente, pero gana una estructura de datos local y una timeline más explícita para varios paneles. Documentalmente, el repo deja de describir esta sección como un rollout detenido en el primer caso.

## Desglose denso

- el heading `Proyectos destacados` conserva su pinning central y ahora hace fade/scale cuando arranca la entrada del primer proyecto
- el primer tramo de scroll sigue reservado al heading, respetando la pausa narrativa que Martín pidió alargar previamente
- `Future Nova` y `Nebula Studios` reutilizan visuales conceptuales repo-safe, no capturas públicas finales
- el stack de cada proyecto usa ya los iconos tecnológicos integrados en la tarea anterior
- la simplificación a lista vertical en móvil/tablet sigue pendiente; esta entrega completa solo la coreografía multi-panel del stage actual

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no existe todavía una variante móvil/tablet separada que degrade esta sección a lista vertical
- los CTAs visibles siguen siendo deliberadamente no navegables mientras no existan URLs públicas reales para cada caso
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` siguen sin estar disponibles en `package.json`

## Notas para presupuesto

Entrega visible de complejidad media: amplía una primitive pública de alto impacto ya integrada, añade nueva coreografía de scroll, datos de portfolio y realinea el canon documental con el runtime ejecutado.
