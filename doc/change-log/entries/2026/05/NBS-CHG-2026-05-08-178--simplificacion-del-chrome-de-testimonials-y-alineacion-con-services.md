---
change_id: NBS-CHG-2026-05-08-178
date: 2026-05-08
title: Simplificacion del chrome de testimonials y alineacion con services
group_id: NBS-TSK-2026-156
category: frontend
subcategories:
  - feature
origin: client-request
complexity: medium
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
  - components/home/testimonials/index.tsx
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Las cards de `Testimonials` se simplifican visualmente, eliminan adornos internos y adoptan el mismo gradiente base usado por las cards de `Services`.

## Contexto / problema

Martín pidió rebajar la carga ornamental de las reseñas para alinearlas mejor con el lenguaje visual del sitio. El runtime actual mantenia esquinas decorativas, divisores internos, badge de revision y acentos lilas innecesarios frente a la sobriedad ya alcanzada en `Services`.

## Cambio realizado

- se crea un shell local reutilizable para las cards de testimonials
- ese shell reaplica el mismo gradiente base de `Services` junto a la misma rejilla sutil
- se eliminan las lineas decorativas de las esquinas
- se elimina el bloque `Reseña validada / Rev. 2026`
- se elimina la linea vertical lila y los adornos prescindibles, pero se conserva la separacion estructural entre quote y bloque derecho
- se sustituye el borde central por una regla vertical dedicada, mas alta y con desvanecimiento progresivo en ambos extremos
- se retira la regla horizontal gris que quedaba encima del nombre en el bloque derecho
- se limpia la composicion interior para que la lectura dependa mas del espacio y menos del chrome
- dentro del rediseño el quote usa tipografia secundaria, alineacion izquierda, un peso todavia mas ligero y una escala algo mas contenida
- se registra la entrega en el `change-log`

## Objetivo

Hacer que las cards de testimonios respiren mas, compartan familia visual con `Services` y se integren mejor en la estetica general de Nebula Studios sin ruido decorativo extra.

## Impacto arquitectonico

Ajuste visual localizado en `components/home/testimonials/index.tsx`, con una pequeña primitive local para unificar el surface de las cards dentro de la misma seccion. No cambia datos, scroll behavior ni contratos compartidos.

## Desglose denso

- el stack sticky se conserva, pero la card deja de apoyarse en esquinas, badges y lineas auxiliares
- la base visual pasa a salir del mismo gradiente oscuro `Void -> Navy` ya usado en las cards de servicios
- la jerarquia interior se simplifica para que el foco recaiga en cita, autor, rol y compania, manteniendo una regla corta de apoyo en el bloque derecho
- el layout deja que la separacion entre bloques la haga el espacio, no los divisores internos

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run changes:sync`

## Pendientes / limites

- no se hizo revision visual manual en navegador dentro de este hilo
- no se introdujo `BorderGlow` en testimonials porque el objetivo pedido era acercarlas a `Services` sin sobrecargarlas

## Notas para presupuesto

Refinamiento visual de una seccion publica con trabajo de limpieza compositiva, unificacion de surface design y cierre documental asociado.
