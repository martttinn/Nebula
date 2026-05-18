# Domain Reference

Documento mínimo para recoger invariantes de negocio y contratos funcionales de la web pública de Nebula Studios.

## 1. Entidades principales

- **Nebula Studios**: estudio de software personal profesionalizado con foco en arquitectura de software a medida
- **Martín**: fundador y perfil técnico principal del estudio
- **Servicio**: bloque público que describe una capacidad comercial real del estudio
- **Cliente ideal**: empresa mediana, negocio local u organización que necesita digitalización pensada
- **Visitante**: usuario que llega para evaluar credibilidad, enfoque y encaje
- **Lead cualificado**: concepto de negocio existente, pero todavía no persistido ni conectado a runtime real dentro del repo

## 2. Invariantes

- el visitante debe entender en pocos segundos que Nebula Studios aporta criterio técnico real
- la marca no debe presentarse como agencia genérica ni como proveedor de horas
- no se inventan métricas, clientes, testimonios, premios, sede o integraciones no verificadas
- si existe una surface pública de testimonios, solo puede usar citas publicables verificadas o placeholders explícitos pendientes de sustitución
- los servicios públicos deben seguir la propuesta confirmada: arquitectura a medida, desarrollo full-stack, evolución continua y auditoría/guía de digitalización
- mientras no exista canal comercial real, el repo no debe vender un flujo de captación como si ya estuviera operativo
- mientras la página de contacto no exista, el ancla `#contacto` puede resolver la última card de `testimonials`, y su botón principal puede ser clicable como affordance visual siempre que no redirija ni prometa un flujo de captación conectado
- mientras no existan páginas legales reales, el footer puede mostrarlas como destinos visibles, pero deben permanecer desactivadas

## 3. Flujos críticos

- **Comprensión inicial**: hero y framing deben explicar quién es Nebula y para quién trabaja
- **Evaluación de encaje**: servicios, proceso, proyectos destacados, testimonios y diferenciadores deben responder si el estudio es el socio adecuado
- **Preparación de contacto**: la web debe acercar al visitante al siguiente paso sin inventar una integración comercial que todavía no existe; hoy ese paso termina en la última card de `testimonials`, recogida por `#contacto`, no en una página ni en un formulario ya conectados
- **Cierre de navegación**: el footer debe reforzar marca y orientación del usuario sin presentar rutas legales o comerciales como operativas si aún no existen

## 4. Permisos y visibilidad

- toda la superficie actual es pública
- no hay permisos, auth ni zonas privadas implementadas
- no existe formulario conectado, por lo que tampoco hay tratamiento repo-local de datos de leads en esta fase

## 5. Riesgos de interpretación

- confundir “estudio de software” con “agencia de diseño genérica”
- convertir “arquitectura de software” en un claim abstracto sin aterrizarlo en negocio
- asumir que “captación cualificada” implica que ya existe CRM, formulario o automatización conectada
- interpretar la última card de `testimonials` como un canal comercial ya operativo cuando hoy solo prepara la futura página de contacto
- interpretar los links legales del footer como páginas publicadas cuando hoy solo son placeholders visibles
- mezclar el alcance actual de la web con el roadmap futuro del estudio

## 6. Pendientes por verificar

- dominio de producción final: `pendiente`
- canal comercial real a conectar primero: `pendiente`
- página de contacto pública conectada a la última card comercial de `testimonials`: `pendiente`
- páginas legales públicas conectadas al footer: `pendiente`
- case studies profundos y portfolio público más allá de la selección destacada en home: `pendiente`
- testimonios publicables con consentimiento y cita final cerrada: `3 confirmados en runtime`
