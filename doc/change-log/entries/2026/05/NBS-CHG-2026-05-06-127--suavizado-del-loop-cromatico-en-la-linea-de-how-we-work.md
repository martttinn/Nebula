---
change_id: NBS-CHG-2026-05-06-127
date: 2026-05-06
title: Suavizado del loop cromatico en la linea de how we work
group_id: NBS-TSK-2026-113
category: frontend
subcategories:
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
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

El loop cromático de la línea SVG de `How we work` se suaviza para eliminar cortes visibles entre repeticiones y dejar transiciones más progresivas entre `Lilac`, `Haze` y `Silver`.

## Contexto / problema

El gradiente repetido introducido en el stroke principal seguía mostrando saltos perceptibles de color. La combinación de un ciclo demasiado corto y un final distinto del color inicial hacía visibles las costuras entre repeticiones.

## Cambio realizado

- se ensancha la longitud del ciclo de gradiente en `components/home/how-we-work.tsx`
- el color inicial y final del loop pasan a coincidir para que la repetición cierre sin costura visible
- se reequilibran los stops intermedios para alargar las transiciones y reducir cambios bruscos
- se actualiza `DESIGN.md` para exigir explícitamente transiciones suaves y progresivas en el loop

## Objetivo

Conseguir que el recorrido de la línea se lea como una variación cromática continua, no como una sucesión de tramos con cortes perceptibles.

## Impacto arquitectonico

Cambio local de frontend con ajuste del canon visual. No altera geometría del path ni estructura de la sección.

## Desglose denso

- el problema no estaba en el glow, sino en la continuidad del propio gradiente repetido
- al repetir un ciclo cuyo último color no coincidía con el primero, el stroke mostraba juntas evidentes
- ahora el loop cierra sobre el mismo tono y dispone de más recorrido para interpolar entre colores de marca

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si más adelante se quiere un loop aún más lento o menos contrastado, el siguiente ajuste lógico sería ampliar más el ancho de ciclo o bajar protagonismo de `Silver`
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Refinamiento visual pequeño pero importante para la calidad percibida de una primitive protagonista del timeline público.
