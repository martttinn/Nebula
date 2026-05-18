---
change_id: NBS-CHG-2026-05-07-169
date: 2026-05-07
title: Suavizado y desaceleracion de las transiciones entre proyectos
group_id: NBS-TSK-2026-134
category: frontend
subcategories:
  - motion
  - scroll-interactions
  - portfolio
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/home/projects-showcase/index.tsx
  - doc/change-log/**
verification:
  - npm run changes:validate
  - npm run lint
  - npm run typecheck
  - npm run build
related_decisions:
---

# Resumen corto

La coreografía entre proyectos en `projects-showcase` se desacelera y suaviza para que los relevos tengan más recorrido y menos brusquedad perceptiva.

## Contexto / problema

La secuencia ya resolvía bien el empuje entre paneles, pero el ritmo seguía siendo demasiado comprimido: el reveal arrancaba pronto, cerraba demasiado rápido y el empuje lateral se percibía más mecánico que editorial.

## Cambio realizado

- se amplía el runway total del stage sticky
- se desplazan los puntos de entrada de los tres proyectos para abrir más separación entre relevos
- se alarga la ventana de reveal de cada panel
- la interpolación principal deja de apoyarse solo en `easeOut` y pasa a `easeInOutCubic` para entrada, empuje, expansión y salida del último proyecto
- la opacidad de aparición sube de forma menos agresiva y el primer proyecto reduce todavía más su salto de escala inicial
- se recorta después el runway muerto previo al primer takeover adelantando el arranque del primer proyecto y acercando ligeramente el segundo stop para que la pausa tipográfica no se alargue en exceso

## Objetivo

Hacer que la transición entre proyectos se sienta más lenta, más controlada y más elegante sin alterar la dirección narrativa ni la lógica borde con borde del empuje.

## Impacto arquitectonico

Ajuste localizado en la timeline y en las curvas de interpolación de `components/home/projects-showcase/index.tsx`. No cambia el modelo de datos ni la estructura general de la sección.

## Desglose denso

- el stage pasa primero de `520svh` a `640svh` para abrir la coreografía, después se recoloca en `580svh` cuando se detecta demasiado scroll muerto antes del primer takeover, y por último se ajusta a `620svh` para abrir más distancia entre proyectos sin reintroducir esa pausa inicial
- el `reveal duration` sube de `0.16` a `0.19`
- los puntos de entrada pasan primero a `0.29`, `0.59` y `0.81`, luego a `0.24`, `0.56` y `0.8`, después a `0.15`, `0.52` y `0.79` para recortar de forma mucho más agresiva el scroll muerto entre el heading y el primer proyecto, y finalmente a `0.14`, `0.58` y `0.82` para aumentar el scroll entre proyectos manteniendo prácticamente intacto el arranque del primero
- el fade del heading se retrasa y se reparte sobre una ventana algo más amplia
- el primer panel sigue entrando sobre el heading sticky, pero su crecimiento ahora se percibe menos nervioso por la combinación de runway extra y easing simétrico

## Validacion

- `npm run changes:validate`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / limites

- el ajuste está hecho por tuning de timing y easing, no por una física nueva; si después quieres una sensación todavía más cinematográfica, el siguiente paso sería desacoplar velocidad de entrada y velocidad de empuje en dos curvas diferentes
- la validación visual fina sigue dependiendo de revisión manual en navegador porque el carácter del motion cambia mucho con viewport y cadencia real de scroll

## Notas para presupuesto

Refinamiento visible de motion sobre una surface pública premium ya integrada, con impacto directo en percepción de calidad.
