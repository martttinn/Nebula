# Repo-Local Skills

Este directorio agrupa skills repo-local versionadas junto al proyecto.

## Ruta canónica

- Las skills específicas del repositorio viven en `.agents/skills/`.
- El objetivo es que la capacidad quede compartida, trazable y no dependa de una instalación manual externa.

## Inventario actual

- `dependency-audit/`
  - Skill repo-local para auditar dependencias, vulnerabilidades, drift y riesgo de upgrades.
  - Uso recomendado junto a `.agents/workflows/dependency-audit.md`.
  - Procedencia: adaptada al stack real de Nebula Studios a partir del patrón usado en otros proyectos web del entorno.
- `ui-ux-pro-max/`
  - Skill repo-local para dirección visual, layout, color, motion, componentes y UX de superficies premium.
  - Uso recomendado como apoyo cuando la tarea dependa de diferenciación visual o refinamiento de experiencia.
  - Procedencia: skill repo-local ya usada en otros repositorios web de Martín.
