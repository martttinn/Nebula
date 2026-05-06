---
change_id: NBS-CHG-2026-05-06-138
date: 2026-05-06
title: Modularizacion interna de la seccion how we work
group_id: NBS-TSK-2026-124
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
  - components/home/how-we-work/**
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La sección `How we work` deja de vivir en un único archivo y pasa a una carpeta modular con entrypoint estable, geometría SVG aislada, configuración centralizada y primitives visuales separadas.

## Contexto / problema

La sección de proceso había crecido mucho por iteración visual y concentraba en un solo archivo configuración, tipos, helpers matemáticos, variante desktop, variante mobile y el componente público. Eso hacía más costoso razonar sobre cambios locales y elevaba el riesgo de tocar superficies no relacionadas.

## Cambio realizado

- se sustituye `components/home/how-we-work.tsx` por la carpeta `components/home/how-we-work/`
- `index.tsx` mantiene la API pública `HowWeWorkSection` y concentra solo la orquestación de scroll, refs y montaje
- `constants.ts` agrupa configuración visual y geométrica
- `types.ts` centraliza los contratos internos
- `path.ts` extrae la generación y medición del path SVG
- `primitives.tsx` reúne heading, nodos, cards, filas y conector desktop/mobile
- `utils.ts` concentra la ayuda de debug visual
- `doc/reference/technical-reference.md` se actualiza para reflejar la nueva estructura real

## Objetivo

Reducir acoplamiento interno y dejar una base más mantenible para futuras iteraciones de la sección de proceso, sin cambiar el comportamiento observable ni el import consumido por la home.

## Impacto arquitectonico

Refactorización local de frontend orientada a separación de responsabilidades. El consumo desde `app/page.tsx` no cambia y la geometría del timeline sigue calculándose desde posiciones reales de nodos en runtime.

## Desglose denso

- el entrypoint público sigue siendo `@/components/home/how-we-work`
- la lógica pura del SVG queda desacoplada del JSX, lo que facilita futuros ajustes de curvatura sin navegar todo el árbol visual
- desktop y mobile siguen compartiendo la misma configuración canónica de la sección
- la referencia técnica deja de apuntar a un archivo ya inexistente y describe la carpeta modular resultante

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha automatizado una comprobación visual de regresión; la validación final de layout y motion sigue siendo manual
- `DESIGN.md` no requiere cambios porque el canon visual no se ha alterado, solo la organización interna
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refactorización técnica de mantenimiento orientada a bajar coste de evolución futura y a mejorar claridad de la sección pública más compleja del landing.
