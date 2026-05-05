---
change_id: NBS-CHG-2026-05-04-081
group_id: NBS-TSK-2026-081
date: 2026-05-04
title: Integracion de CTA secundarios en las cards de servicios
type: ui
status: done
owner: Codex
tags:
  - home
  - services
  - cta
  - ui
---

# Contexto

El carrusel de servicios ya explicaba las cuatro capacidades principales del estudio, pero cada card terminaba en la descripción y no ofrecía ninguna salida contextual al usuario para seguir explorando.

## Cambio realizado

- cada `ServiceCard` incorpora ahora un botón `Ver más`
- el CTA reutiliza la primitive `Button` en variante `secondary`
- el botón se integra en la franja inferior de la card, debajo de la descripción, sin alterar el esquema `heading / símbolo / cierre`
- el CTA añade una flecha hacia la derecha al final del label
- en hover, la flecha del CTA se desplaza levemente hacia la derecha como microinteracción local de la card
- se compacta el copy de `data/services.ts`, se trunca visualmente si excede el espacio previsto y se reserva una franja inferior estable dentro de la card para asegurar que el botón entra completo y queda siempre anclado al final
- heading y descripción pasan a leerse centrados, y el CTA queda centrado horizontalmente dentro del cierre inferior
- mientras no existan páginas de detalle por servicio, el CTA deriva a `/#contacto`
- se actualizan `DESIGN.md`, referencia técnica y `decisions-log`

## Objetivo

Dar a cada servicio una acción de continuación sin romper la jerarquía visual ni convertir el carrusel en una sección demasiado comercial.

## Impacto

La sección gana una salida contextual por card y el runtime público mejora su capacidad de conducir al siguiente paso desde la propia exposición de servicios.

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Riesgos / seguimiento

- conviene reemplazar el destino genérico `/#contacto` cuando existan superficies reales de detalle o un flujo comercial específico por servicio
