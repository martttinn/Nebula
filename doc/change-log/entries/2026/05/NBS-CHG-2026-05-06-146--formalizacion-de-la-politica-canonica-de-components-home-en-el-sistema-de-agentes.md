---
change_id: NBS-CHG-2026-05-06-146
date: 2026-05-06
title: Formalizacion de la politica canonica de components-home en el sistema de agentes
group_id: NBS-TSK-2026-132
category: docs
subcategories:
  - rules
  - architecture
origin: client-request
complexity: medium
scope: systemic
user_visible: false
release_impacts:
  - docs
  - agent-workflow
architecture_layers:
  - docs
  - components
  - workflows
backend_sensitive: false
files_touched:
  - AGENTS.md
  - .agents/README.md
  - .agents/decisions-log.md
  - .agents/rules/03-nextjs-web-rules.md
  - .agents/rules/07-code-style-and-implementation-rules.md
  - .agents/workflows/task-start.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La política de organización por carpetas canónicas dentro de `components/home/` queda formalizada en `AGENTS.md`, en las reglas y workflows de `.agents/`, en el `decisions-log` y en la referencia técnica viva del repo.

## Contexto / problema

La home ya había sido refactorizada a familias como `hero/`, `value-proposition-section/`, `services-carousel/` y `how-we-work/`, pero esa arquitectura seguía dependiendo de memoria reciente. Sin una regla explícita, un agente futuro podía volver a abrir wrappers en la raíz de `components/home/`, mezclar responsabilidades o tratar la estructura actual como una excepción local.

## Cambio realizado

- se añade a `AGENTS.md` una regla dura que define `components/home/<seccion>/index.tsx` como estado objetivo
- `.agents/rules/03-nextjs-web-rules.md` y `.agents/rules/07-code-style-and-implementation-rules.md` pasan a exigir consumo por path canónico y colocalización por responsabilidad
- `.agents/workflows/task-start.md` obliga a decidir carpeta canónica, boundary público y breakdown interno antes de implementar
- `.agents/README.md` y `doc/reference/technical-reference.md` documentan la política para humanos y agentes
- `.agents/decisions-log.md` registra la decisión como memoria duradera del proyecto

## Objetivo

Hacer que la nueva arquitectura de componentes de la home deje de ser una migración reciente y pase a ser una convención operativa explícita y reproducible.

## Impacto arquitectonico

No introduce cambios de runtime. Endurece el contrato de organización del frontend y reduce riesgo de drift estructural en futuras tareas sobre la home pública.

## Desglose denso

- `components/home/*.tsx` deja de considerarse destino válido para secciones públicas complejas salvo transición explícita
- el entrypoint público esperado de cada sección pasa a ser `index.tsx`
- se explicita el breakdown preferido de `primitives.tsx`, `constants.ts`, `types.ts`, `content.ts` y `geometry.ts` o `path.ts`
- los consumers route-level deben importar el directorio canónico y no archivos internos profundos

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- `npm run changes:sync` no puede ejecutarse hoy porque faltan scripts `changes:*` en `package.json`
- el `change-log` histórico conserva referencias a rutas antiguas cuando describen estados pasados del repo; eso no invalida la nueva política canónica

## Notas para presupuesto

Entrega de hardening arquitectónico y de gobernanza del repositorio. Su valor está en prevenir regresiones estructurales y en abaratar decisiones futuras de implementación dentro de la home.
