# Documentación del repositorio

Este árbol centraliza la documentación repo-local mínima que acompaña al sistema de agentes.

## Estructura

- `../DESIGN.md`: sistema visual canónico en raíz para agentes y tooling
- `reference/`: referencia técnica y de dominio del proyecto
- `change-log/`: subsistema repo-only para registrar entregas lógicas

## Precedencia recomendada

1. código ejecutado del repo
2. `DESIGN.md` para identidad visual, tokens y componentes reutilizables
3. documentación de referencia (`doc/reference/**`)
4. decisiones duraderas (`.agents/decisions-log.md`)
5. historial de entregas (`doc/change-log/**`)

## Regla de uso

- `DESIGN.md` documenta el canon visual y debe vivir en la raíz para maximizar discoverability entre agentes
- `doc/reference/**` documenta el sistema y sus contratos
- `.agents/decisions-log.md` documenta decisiones duraderas
- `doc/change-log/**` documenta entregas ejecutadas y grupos de trabajo

Si `DESIGN.md` y el código actual divergen, no elijas una versión en silencio: trátalo como drift explícito. El código describe el runtime actual; `DESIGN.md` describe el objetivo visual canónico.

No mezcles estas capas salvo que una tarea cambie realmente varias a la vez.
