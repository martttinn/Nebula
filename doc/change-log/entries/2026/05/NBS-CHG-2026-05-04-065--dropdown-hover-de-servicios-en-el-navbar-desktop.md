---
change_id: NBS-CHG-2026-05-04-065
date: 2026-05-04
title: Dropdown hover de servicios en el navbar desktop
group_id: NBS-TSK-2026-065
category: frontend
subcategories:
  - feature
  - navigation
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
  - components/layout/navbar.tsx
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

El link `Servicios` del navbar desktop termina resolviéndose como una expansión interna del propio shell, con cuatro cards cuadradas y redondeadas alimentadas desde el mismo catálogo público de servicios que ya usa el carrusel de la home.

## Contexto / problema

Martín pidió que el navbar no se limitara a un anchor plano para `Servicios`, sino que expusiera en hover una preview clara de las cuatro capacidades principales del estudio. El repo ya tenía un catálogo público de servicios, así que duplicar nombres o taxonomías habría abierto drift inmediato.

## Cambio realizado

- `components/layout/navbar.tsx` añade un dropdown hover/focus-within solo en desktop sobre el link `Servicios`
- el estado final sustituye ese dropdown absoluto por una expansión en altura del propio navbar, manteniendo una única superficie glass continua
- la secuencia final se reordena para que la fila superior permanezca estable, el shell crezca solo hacia abajo y las cards entren staggered de izquierda a derecha
- el dropdown usa cuatro cards cuadradas, con bordes redondeados, retícula sutil, eyebrow, título y chevron
- las cards consumen `data/services.ts`, de modo que navbar y carrusel comparten la misma fuente de verdad
- el trigger `Servicios` añade un chevron desplegable que rota al abrirse
- se elimina el clipping horizontal del rail desktop del navbar para que el panel pueda desbordar y mostrarse correctamente en hover
- se retema el dropdown para que comparta el mismo material glass del navbar, incluyendo blur visible y borde resuelto por inset highlight en vez de un borde CSS separado
- se rebajan las capas opacas internas del shell y de las cards para que el blur siga siendo perceptible y el dropdown no derive a gris plano
- se reestructura el material del dropdown con una capa absoluta dedicada al glass en el shell y en cada card para que el blur no dependa solo del fondo del contenedor
- se desacopla el blur del shell principal del navbar a una capa interna dedicada, evitando que ese ancestro mate el backdrop real del dropdown
- se elimina la percepción de blur tardío precalentando el panel con opacidad casi nula y dejando la inercia de entrada en el movimiento, no en el material
- el blur queda restringido al shell del dropdown y las cards internas pasan a superficies opacas para mejorar contraste y legibilidad
- se suaviza la apertura del dropdown con un fade corto y microdesplazamiento, evitando tanto la brusquedad como la sensación de blur tardío
- el fill del shell del dropdown se iguala exactamente al del navbar para evitar deriva a un tono más oscuro
- al mantener ese mismo fill con cards opacas, se intensifica el blur del shell para que el material siga leyéndose como vidrio

## Objetivo

Anticipar desde la navegación principal el alcance real del estudio, mejorando comprensión y percepción premium sin convertir el navbar en un mega menú genérico.

## Impacto arquitectónico

La navegación global gana una capa informativa adicional en desktop. A nivel de arquitectura, navbar y sección de servicios comparten ya catálogo público y evitan taxonomías paralelas.

## Desglose denso

- el dropdown se monta con `group-hover` y `group-focus-within` para preservar apertura en hover y navegación por teclado básica
- cada card apunta hoy a `/#servicios`, porque el catálogo público ya existe pero todavía no hay rutas o subsecciones individuales por servicio
- el acabado visual sigue el sistema Nebula actual: fondo oscuro, blur fuerte, acentos lilas contenidos y texto `Silver / Haze`
- el dropdown no usa iconografía de servicio; la jerarquía se apoya en copy corto y chevrons para no competir con el carrusel de la propia sección

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho todavía revisión visual automatizada del dropdown en navegador para afinar la zona de hover y el espaciado entre trigger y panel
- `npm run changes:sync` sigue sin poder ejecutarse porque los scripts `changes:*` no existen en `package.json`

## Notas para presupuesto

Feature visible de frontend con mejora clara de navegación y reutilización del catálogo público ya integrado en la home.
