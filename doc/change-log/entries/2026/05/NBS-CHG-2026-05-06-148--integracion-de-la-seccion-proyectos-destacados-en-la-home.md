---
change_id: NBS-CHG-2026-05-06-148
date: 2026-05-06
title: Integracion de la seccion Proyectos destacados en la home
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
  - app
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/projects-showcase/**
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/reference/domain-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La home pública incorpora una nueva sección `Proyectos destacados` con scroll storytelling en desktop y versión apilada para móvil, tablet y `prefers-reduced-motion`.

## Contexto / problema

La narrativa pública actual explicaba propuesta, servicios y proceso, pero seguía sin una surface explícita de proyectos que aterrizara visualmente el tipo de trabajo que Nebula Studios puede construir. Además, el navbar ya exponía el anchor `/#proyectos` aunque esa sección todavía no existía.

## Cambio realizado

- se crea la familia `components/home/projects-showcase/`
- se añade un catálogo local repo-safe con tres proyectos destacados
- desktop usa un stage sticky con intro tipográfica centrada y tres paneles que ascienden desde abajo y se superponen por scroll
- móvil, tablet y `prefers-reduced-motion` degradan a una lista vertical de cards sin pinning largo
- se integra la sección en `app/page.tsx` justo después de `How we work`
- se actualizan `DESIGN.md`, `.agents/decisions-log.md` y referencias técnicas/dominio para reflejar la nueva primitive

## Objetivo

Añadir una prueba de capacidad más concreta al recorrido público de la home sin inventar todavía un portfolio live profundo ni enlaces públicos que el proyecto no tiene hoy.

## Impacto arquitectonico

El cambio introduce una nueva carpeta canónica dentro de `components/home/`, mantiene el patrón `Server Components first` con una isla cliente acotada para el stage sticky y refuerza el contrato documental del sistema visual al canonizar `projects-showcase` en `DESIGN.md`.

## Desglose denso

- la sección usa `id="proyectos"` y hace funcional el anchor existente del navbar
- el heading visible acentúa `Proyectos` para respetar la regla de una única palabra clave lila por header
- los paneles desktop mantienen materialidad opaca y profundidad por desplazamiento, escala mínima y orden de apilado, sin WebGL ni rotaciones teatrales
- el catálogo deja `href` opcional y resuelve el estado por defecto como `Caso en preparación`
- la referencia de dominio deja de tratar el portfolio público como totalmente ausente y pasa a registrar que sigue pendiente una capa más profunda de case studies

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- los media frames usan visuales conceptuales repo-safe, no capturas finales de proyectos publicados
- no existe todavía una URL pública real para cada caso, por lo que la acción visible queda deliberadamente no interactiva
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`; el índice derivado del `change-log` puede seguir desalineado hasta que ese tooling se restaure

## Notas para presupuesto

Entrega visible de media complejidad: añade una sección nueva de alto impacto a la home, combina layout responsive, motion por scroll y documentación sistémica, y además desbloquea un anchor público que hasta ahora apuntaba a una superficie inexistente.
