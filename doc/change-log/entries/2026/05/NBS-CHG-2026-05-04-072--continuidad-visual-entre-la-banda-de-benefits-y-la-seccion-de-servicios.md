---
change_id: NBS-CHG-2026-05-04-072
date: 2026-05-04
title: Continuidad visual entre la banda de benefits y la seccion de servicios
group_id: NBS-TSK-2026-072
category: frontend
subcategories:
  - services
  - gradients
  - visual-system
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - components/home/services-carousel.tsx
  - DESIGN.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run build
---

# Resumen corto

La union entre benefits y servicios deja de depender de dos bloques cromaticos opuestos: benefits vuelve hacia `Void` al final y servicios arranca ya desde esa misma base oscura, sin reiniciar una banda separada.

## Contexto / problema

La primera correccion no basto porque el problema no estaba solo en el arranque de servicios. La banda de benefits seguia cerrando demasiado arriba en `Navy`, y servicios seguia leyéndose como otro bloque cromatico arrancando justo debajo.

## Cambio realizado

- se crea `VALUE_PROPOSITION_BACKGROUND` para que la banda de benefits suba a `Navy` en el tramo medio pero vuelva hacia `Void` al final
- se reajusta `SERVICES_SECTION_BACKGROUND` para que servicios arranque ya desde `Void`, con solo un brillo superior muy contenido
- desktop y movil usan el mismo `backgroundImage` en servicios
- `DESIGN.md` se actualiza para reflejar el nuevo contrato de continuidad en ambas primitives
- se recorta de nuevo el runway final de `benefits` y se adelanta el arranque vertical del heading de `services` para cerrar el hueco visible entre ambas

## Objetivo

Hacer que la transicion entre ambas secciones se lea como una sola atmosfera continua, no como una franja azul seguida de un bloque negro separado por una linea dura.

## Impacto arquitectonico

El ajuste queda encapsulado en las shells visuales de `ValuePropositionSection` y `ServicesCarouselSection` y en el contrato visual de `DESIGN.md`; no altera sticky, snap ni datos del carrusel.

## Validacion

- `npm run lint`
- `npm run build`

## Pendientes / limites

- el repo no expone `npm run design:lint`
- no se ha hecho revision visual automatizada en navegador en esta sesion

## Notas para presupuesto

Refinamiento puntual del sistema visual entre dos superficies publicas contiguas con segunda iteracion correctiva.
