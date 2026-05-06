---
change_id: NBS-CHG-2026-05-06-120
date: 2026-05-06
title: Suavizado de la salida desde el primer nodo del timeline how we work
group_id: NBS-TSK-2026-106
category: frontend
subcategories:
  - bugfix
  - ui-ux-redesign
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/how-we-work.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

La salida del path desde el primer nodo real de `How we work` se suaviza para que el tramo hacia el siguiente hito no caiga bruscamente nada mas abandonar el nodo.

## Contexto / problema

Tras abrir manualmente la geometria del timeline, el recorrido principal quedaba cercano al resultado deseado, pero la salida desde el nodo inicial hacia el segundo hito seguia resolviendose con una bajada demasiado abrupta. El gesto no era organico: la linea “se desplomaba” demasiado pronto tras abandonar el primer nodo.

## Cambio realizado

- se introduce `OUTER_NODE_VERTICAL_HANDLE_RATIO` en `components/home/how-we-work.tsx`
- los nodos reales de arranque y cierre del recorrido usan una intensidad vertical propia, mas contenida que la de los nodos internos
- los nodos internos mantienen su tangencia y su apertura mas agresiva sin contaminar la salida del primer hito

## Objetivo

Hacer que la transicion desde el nodo inicial hacia el siguiente tramo se lea mas natural, con una caida progresiva en vez de una flexion inmediata demasiado fuerte.

## Impacto arquitectonico

Cambio local en la funcion que genera el path SVG. No altera layout, medicion runtime ni estructura de la seccion.

## Desglose denso

- antes, el mismo peso vertical usado para los nodos internos podia aplicarse tambien al primer nodo real al iniciar el tramo `01 -> 02`
- eso colocaba el primer handle demasiado abajo y forzaba una pendiente descendente muy fuerte justo al salir del nodo
- ahora la componente vertical del handle depende del tipo de nodo: borde, nodo exterior o nodo interior
- el cambio conserva la personalidad del recorrido intermedio, pero afloja la “palanca” vertical en el primer y ultimo nodo reales

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- la aprobacion final sigue siendo visual y depende del equilibrio entre esta ratio nueva y los valores manuales ya subidos para nodos internos
- `DEBUG_BORDERS` sigue activo en `components/home/how-we-work.tsx`, por lo que los contornos debug siguen visibles en runtime
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual muy localizado, con impacto directo en la naturalidad del gesto principal de una seccion publica protagonista.
