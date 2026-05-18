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
  - npm run changes:sync
---

# Resumen corto

La sección `Proyectos destacados` deja de mostrar un solo caso y pasa a encadenar tres proyectos full-screen sobre el mismo stage de scroll en desktop, mientras móvil y tablet degradan a una lista vertical simplificada con visual superior, título, descripción y CTA visibles.

## Contexto / problema

Tras estabilizar el heading pinned y el primer takeover de proyecto, el runtime seguía cortando la narrativa de portfolio demasiado pronto. El segundo y tercer proyecto aún no existían en la coreografía real, aunque el canon documental ya los contemplaba como intención final.

## Cambio realizado

- se sustituye el objeto único de proyecto por un catálogo local de tres casos
- se amplía la timeline del stage para dejar más runway al heading y para secuenciar tres paneles completos
- el primer proyecto entra desde abajo en una versión compacta, se desliza sobre el heading sticky sin desplazarlo, se centra y luego se expande progresivamente hasta full-screen; el segundo entra de derecha a izquierda y el tercero también de derecha a izquierda; cada panel empuja al saliente en lugar de limitarse a cubrirlo por simple solape
- en móvil y tablet, la sección deja de compartir ese mismo stage full-screen y pasa a una lista vertical de cards simplificadas donde cada proyecto conserva el visual superior y reduce el bloque editorial a título + descripción + CTA
- mientras el primer proyecto sigue en su fase compacta, añade un contorno exterior `Silver` muy sutil que ayuda a contener la estructura visual antes de diluirse por completo al llegar a full-screen
- la columna editorial de cada proyecto se simplifica a un único CTA primario `Ver más`, eliminando `Visitar proyecto` para limpiar la jerarquía visual
- los empujes laterales se recalibran para que panel entrante y saliente mantengan contacto borde con borde, evitando la franja negra visible entre proyectos durante la transición
- se añaden los casos `Future Nova` y `Nebula Studios` con copy repo-safe y stacks tipados
- se actualizan `DESIGN.md`, `.agents/decisions-log.md` y la referencia técnica para reflejar que el runtime ya no está en fase de un solo panel

## Objetivo

Completar la narrativa principal de portfolio en la home y acercar el runtime real a la intención original de `projects-showcase` sin inventar un portfolio público más profundo de lo que existe.

## Impacto arquitectonico

La primitive `projects-showcase` mantiene una única isla cliente, pero gana una estructura de datos local y una timeline más explícita para varios paneles. Documentalmente, el repo deja de describir esta sección como un rollout detenido en el primer caso.

## Desglose denso

- el heading `Proyectos destacados` conserva su pinning central real durante la entrada bottom-up del primer proyecto y solo hace fade/scale leve después, cuando ese panel ya lo ha cubierto y entra en expansión
- el primer tramo de scroll sigue reservado al heading, respetando la pausa narrativa que Martín pidió alargar previamente
- el primer caso deja de arrancar como takeover completo: entra más pequeño, se estabiliza centrado y solo después crece hasta ocupar todo el viewport
- la coreografía de entrada deja de ser homogénea: el segundo y tercer caso usan desplazamiento horizontal opuesto y el panel entrante desplaza físicamente al saliente
- móvil y tablet ya no usan la misma surface sticky del desktop: renderizan cards apiladas con visual superior y un bloque editorial mínimo debajo
- `Future Nova` y `Nebula Studios` reutilizan visuales conceptuales repo-safe, no capturas públicas finales
- el stack de cada proyecto usa ya los iconos tecnológicos integrados en la tarea anterior
- la degradación móvil/tablet queda ya implementada, mientras desktop conserva la coreografía multi-panel scroll-driven

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- los CTAs visibles siguen siendo deliberadamente no navegables mientras no existan URLs públicas reales para cada caso
- la validación visual fina en desktop ancho sigue dependiendo de revisión manual porque la coreografía es sensible a viewport, ritmo de scroll y orden de apilado

## Notas para presupuesto

Entrega visible de complejidad media: amplía una primitive pública de alto impacto ya integrada, añade nueva coreografía de scroll, datos de portfolio y realinea el canon documental con el runtime ejecutado.
