---
change_id: NBS-CHG-2026-05-04-064
date: 2026-05-04
title: Integracion del carrusel de servicios heredado de nebula-legacy
group_id: NBS-TSK-2026-064
category: frontend
subcategories:
  - feature
  - migration
  - ui-ux-redesign
origin: client-request
complexity: medium
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - data
  - web
  - docs
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/services-carousel.tsx
  - data/services.ts
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

La home publica recupera el carrusel de servicios de `nebula-legacy` y lo integra como una seccion propia del proyecto actual, retemada a la identidad Nebula vigente y alineada con un catalogo de capacidades en espanol.

## Contexto / problema

Despues del hero y de la banda de propuesta de valor, la home actual todavia no aterrizaba de forma visualmente fuerte los servicios publicos del estudio. Ya existia en `nebula-legacy` un carrusel de servicios con mecanica compleja y buen potencial, pero su copy, su palette y parte de sus classes pertenecian a un sistema visual anterior.

## Cambio realizado

- se extrae la mecanica principal del carrusel de `nebula-legacy`
- se crea `data/services.ts` como catalogo estatico de cuatro capacidades publicas confirmadas
- se crea `components/home/services-carousel.tsx` con arco sticky para desktop y carrusel horizontal con snap nativo para movil
- se retema el bloque al sistema actual de Nebula: fondo dark-tech, reticula sutil, acentos lilas y tipografia `Syne` + `Inter`
- se integra la nueva seccion en la home justo despues de la banda de propuesta de valor

## Objetivo

Convertir la capa de servicios en una surface memorable y clara sin reinventar una primitive compleja que el estudio ya habia validado en el proyecto legado.

## Impacto arquitectonico

La home deja de depender solo de copy secuencial y gana una tercera seccion estructural. El repo incorpora ademas su primer catalogo estatico publico en `data/`, y formaliza `nebula-legacy` como superficie de referencia puntual para migraciones visuales seleccionadas.

## Desglose denso

- el arco desktop se controla con un hook de progreso de scroll local y un reparto geometrico de cards sobre una curva
- movil y tablet usan una pista horizontal con `snap` nativo y una overlay sticky que mantiene la ilusion del mismo carrusel
- las cards ya no usan el styling legacy basado en `primary-*` o `nebula-bg`; se reescriben sobre la paleta `void / navy / lilac / silver / haze` del repo actual
- el copy de servicios se alinea con los invariantes de dominio ya documentados: arquitectura a medida, desarrollo full-stack, evolucion continua y auditoria/digitalizacion
- se mantiene una separacion limpia entre datos (`data/services.ts`) y surface interactiva (`components/home/services-carousel.tsx`)

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- no se ha hecho todavia una revision visual automatizada del carrusel en navegador para calibrar con precision la escala de las cards y el runway sticky en desktop
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen en `package.json`

## Notas para presupuesto

Migracion visible de frontend con reutilizacion inteligente de componente legado, adaptacion de datos, retemado visual e integracion real en la IA publica de la home.
