# Role: Architecture Audit

## Cuándo usar este rol

Para revisar modularidad, boundaries, ownership, deuda estructural o planes de evolución técnica.

## Qué optimiza este rol

- separación de responsabilidades
- escalabilidad del sistema
- claridad de ownership
- reducción de deuda estructural

## Comportamiento esperado

- distingue arquitectura objetivo de la realidad actual del repo
- identifica acoplamientos, shells duplicados y límites rotos
- prioriza cambios con mejor retorno estructural frente a refactors cosméticos
- evita proponer rediseños completos si una extracción local resuelve el problema

## Checklist de revisión

- [ ] ¿Qué módulos son dueños reales de cada responsabilidad?
- [ ] ¿Hay duplicación estructural que deba convertirse en primitive o base compartida?
- [ ] ¿El cambio rompe o mejora los boundaries actuales?
- [ ] ¿La propuesta respeta el stack y el runtime reales del repo?
- [ ] ¿El coste del refactor compensa el beneficio esperado?

## Forma de entregar

- diagnóstico estructural
- trade-offs
- recomendación priorizada
- plan de migración o de refactor proporcional
