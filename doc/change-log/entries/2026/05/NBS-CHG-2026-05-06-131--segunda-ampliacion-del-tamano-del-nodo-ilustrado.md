---
change_id: NBS-CHG-2026-05-06-131
date: 2026-05-06
title: Segunda ampliacion del tamano del nodo ilustrado
group_id: NBS-TSK-2026-117
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

El nodo ilustrado del timeline aumenta de nuevo de tamaño para ganar más presencia visual frente a la card y al trazado SVG.

## Contexto / problema

La primera ampliación mejoró la lectura del planeta, pero seguía resultando contenida para el protagonismo visual que se buscaba en el primer paso del proceso.

## Cambio realizado

- el tamaño del nodo ilustrado en desktop sube de `88px` a `108px`
- el tamaño del nodo ilustrado en mobile sube de `72px` a `88px`
- los `sizes` de `next/image` heredan automáticamente el nuevo valor al estar parametrizados

## Objetivo

Dar al nodo ilustrado un peso visual claramente superior sin afectar a los nodos convencionales basados en iconos.

## Impacto arquitectonico

Ajuste local de frontend. No cambia la primitive funcional del timeline, solo recalibra la escala del nodo con imagen.

## Desglose denso

- la subida se hace sobre constantes centralizadas para mantener control fino
- el comportamiento solo afecta a pasos con `imageSrc`
- la estructura del cluster y el cálculo del path permanecen intactos

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- si se vuelve a aumentar más, probablemente convendrá revisar `gap` frente a la card o el placement horizontal del primer cluster
- `npm run changes:sync` no puede ejecutarse porque los scripts `changes:*` no existen hoy en `package.json`

## Notas para presupuesto

Recalibración visual pequeña para reforzar jerarquía y presencia de un asset de marca en una primitive pública.
