---
version: 1
name: "Nebula Studios Visual System"
description: "Sistema visual canónico para la web pública de Nebula Studios: dark-tech minimal, elegante, técnico y orientado a credibilidad premium."
colors:
  primary: "#534AB7"
  void: "#09090F"
  navy: "#0A0F2E"
  lilac: "#534AB7"
  silver: "#E8E8F0"
  haze: "#B5B1E3"
  line: "#24243A"
  surface: "#0B0C16"
  surface-alt: "#141625"
  text: "{colors.silver}"
  text-muted: "#ABA7C7"
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 4.5rem
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: -0.05em
  heading-lg:
    fontFamily: Syne
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.04em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.3em
rounded:
  sm: 0.875rem
  md: 1.25rem
  lg: 1.75rem
  xl: 2.5rem
  full: 999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  section: 5rem
  max-width: 82rem
components:
  page-shell:
    backgroundColor: "{colors.void}"
    textColor: "{colors.text}"
    padding: "{spacing.xl}"
  hero-shell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: "{spacing.section}"
  panel-base:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  panel-muted:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  value-proposition-band:
    backgroundColor: "#09090F"
    textColor: "{colors.haze}"
    rounded: "{rounded.lg}"
    padding: "{spacing.section}"
  services-carousel:
    backgroundColor: "linear-gradient(180deg,#09090F 0%,#080A12 26%,#09090F 100%)"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.section}"
  button-primary:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.void}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.text}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.md}"
  nav-pill:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  section-heading:
    textColor: "{colors.text}"
    accentColor: "{colors.lilac}"
    typography: "{typography.heading-lg}"
  section-label:
    textColor: "{colors.lilac}"
    typography: "{typography.label-sm}"
---

# Nebula Studios Design System

## Overview

Este archivo define el idioma visual canónico del repositorio. Nebula Studios debe sentirse como un estudio técnico premium: oscuro, preciso, sobrio y con una pieza de identidad clara alrededor del cubo isométrico.

Los tokens YAML son normativos. La prosa explica intención, límites y jerarquía. Si el código se desvía de este documento, el drift debe hacerse explícito.

## Brand Thesis

La marca no debe sonar a agencia genérica ni a laboratorio experimental sin negocio. La percepción deseada es:

- criterio técnico visible
- elegancia sobria
- mínima decoración gratuita
- autoridad construida desde claridad, no desde ruido

## Colors

- **Void (`#09090F`)** es el fondo dominante. Debe sostener casi toda la atmósfera del sitio.
- **Navy (`#0A0F2E`)** da profundidad y separa capas cuando hace falta otro plano oscuro.
- **Lilac (`#534AB7`)** es el acento principal. No debe convertirse en un gradiente omnipresente.
- **Silver (`#E8E8F0`)** es el texto y la luz de referencia.
- **Haze (`#B5B1E3`)** vive en etiquetas, líneas de soporte y estados menos protagonistas.
- **Line (`#24243A`)** separa superficies sin endurecer demasiado el contraste.

Se permiten gradientes radiales sobre base oscura, pero el resultado debe seguir siendo técnico y limpio, no fantasía espacial recargada.

## Typography

- **Syne Bold / ExtraBold** gobierna titulares, mensajes de autoridad y claims de alto impacto.
- **Inter** gobierna lectura continua, labels y supporting copy.

La tensión visual del sitio sale del contraste entre una display expresiva y un cuerpo extremadamente legible.

## Layout & Atmosphere

- composiciones generosas, con aire real entre bloques
- densidad controlada y jerarquía fuerte
- responsive desde el primer componente
- fondos con profundidad por luz, rejilla y blur, no por ruido excesivo
- el scroll global puede usar `Lenis`, pero con inercia contenida, respeto estricto por `prefers-reduced-motion` y opt-out explícito en scrolls anidados mediante atributos granulares (`data-lenis-prevent`, `data-lenis-prevent-touch`, etc.) según el tipo real de interacción que deba preservarse

El recurso visual memorable es el cubo isométrico con seis facetas y gradientes radiales. Debe usarse como firma de marca, no como textura repetida.

## Components

- `page-shell`: fondo base y respiración general
- `preloader`: overlay full-screen de branding breve con logo animado y barra de progreso, reservado para la entrada inicial de la home
- `hero-shell`: bloque de autoridad con headline, CTA y pieza de identidad
  En la home actual debe priorizar un único heading contundente en `Syne`, un subheading claro en `Inter` y dos CTAs al cierre del bloque, con composición centrada sobre el viewport.
  Cuando se use motion de entrada en el copy principal, la secuencia preferida es: heading primero, subheading después y CTAs al final, con transiciones legibles y sin solaparse con el preloader.
  El heading principal puede usar un reveal `SplitText` por caracteres con entrada ascendente y blur de arranque muy contenido; el subheading puede compartir ese mismo lenguaje de aparición, pero con timing más calmado y menor protagonismo visual que el titular.
  La secuencia completa debe sentirse ágil: sin pausas muertas largas entre loader, heading, subheading y CTAs.
  Se permiten partículas lilas sutiles pero legibles, dispersas y de deriva lenta como capa atmosférica secundaria, resueltas como círculos nítidos sin blur y con ciclos largos de aparición, permanencia y desvanecimiento suave; nunca como ruido dominante.
  El hero debe cerrar en `Void` totalmente opaco. No puede terminar con overlays semitransparentes que dejen ver la capa inferior justo en la costura con la siguiente sección.
- `value-proposition-band`: banda editorial inmediatamente posterior al hero, sobre base `Void` continua, con frases cortas de alto contraste y ritmo generoso
  Debe sentirse como una segunda capa de autoridad: menos espectacular que el hero, pero más tajante en mensaje.
  Su fondo no debe abrir otra banda cromática respecto al hero. La base debe mantenerse en `Void` y, si hace falta atmósfera extra, resolverse solo con un radial lila muy tenue que no genere costura visible en la entrada.
  En móvil, si hay riesgo de seam por redondeo/composición entre bloques, puede solaparse 1px con la sección anterior para evitar líneas horizontales fantasma.
  Las frases viven en `Syne` con escala amplia y composición centrada en pantalla, sin numeración, sin líneas divisorias y sin ruido extra.
  Cuando se use el efecto palabra a palabra en scroll en esta banda, el color base de cada palabra arranca en blanco con opacidad baja y progresa hacia `Silver` (`#E8E8F0`) conforme el bloque cruza el viewport.
  Ese coloreado no debe resolverse demasiado rápido: debe consumir casi todo el tramo útil de cada frase antes de completar la lectura, obligando a un scroll claramente mayor para colorear cada palabra por completo.
  En motion normal, la banda debe comportarse como un stage sticky de viewport completo: una única frase visible cada vez, centrada en pantalla, mientras las demás entran y salen del mismo eje.
  Cada frase debe aparecer desde más abajo, asentarse en el centro y desaparecer hacia arriba con una transición suave y ordenada; la entrada y la salida deben venir del scroll real, no de delays temporizados ni autoplay independiente.
  El cambio palabra a palabra debe ocurrir dentro del tramo activo de cada frase, no en una lista vertical acumulativa.
  La banda no debe depender de runway vacío posterior ni de que exista otra sección debajo para completar la revelación de la última frase; el propio stage sticky debe contener su recorrido.
  Puede incorporar dos `abstract-icons` decorativos sincronizados por frase, siempre detrás del copy: deben aparecer a la vez que la frase con un `pop-in` breve, derivar lentamente como objetos en suspensión y salir solo por desvanecimiento al cambiar al siguiente statement. No deben pulsar ni desvanecerse durante su vida activa.
- `services-carousel`: carrusel de servicios recuperado de `nebula-legacy` y retemado al sistema actual
  En desktop debe vivir como arco sticky controlado por scroll vertical; en móvil debe degradar a una lista vertical de cards completas, sin carrusel ni swipe horizontal.
  En móvil no debe existir ninguna superficie horizontal que compita con el scroll natural del documento. La navegación debe sentirse nativa: scroll vertical libre, todas las capacidades visibles y ningún gesto oculto obligatorio para descubrir servicios.
  Su fondo no debe reiniciar una banda cromática distinta respecto a la sección anterior: arranca ya en `Void`, con brillo muy contenido, y deja que la profundidad salga de las cards y de los acentos, no de un bloque superior separado por una línea perceptible.
  Si una transición entre secciones genera una seam visible en móvil, servicios debe absorberla solapando 1px con la sección anterior, nunca dibujando una línea nueva.
  Puede reutilizar exactamente la misma capa de partículas del hero como atmósfera de continuidad entre secciones, sin crear una variante paralela ni otra firma visual distinta.
  Su heading debe arrancar suficientemente cerca de la banda de benefits para que ambas secciones se lean como continuidad, no como dos bloques separados por una cámara de aire.
  En desktop, las cards deben sentirse generosas en tamaño y respirar entre sí: el arco debe abrirse lo suficiente para que queden más separadas sin perder la lectura curvada del conjunto.
  Si el tamaño base de la card aumenta, deben recalibrarse también título, icono central, clamp del copy, footer y padding inferior; no vale con escalar solo el contenedor.
  Las cards deben sentirse técnicas y premium: fondo oscuro opaco, retícula sutil, un único acento cromático por servicio y copy corto de lectura rápida.
  Dentro de cada card, el heading debe quedar arriba del todo sin `eyebrow`, y el centro debe usar el icono 3D correspondiente al servicio servido desde `public/3d-Icons`, no un asset único compartido para todo el carrusel. La descripción debe anclarse en la franja inferior. Tanto heading como descripción deben leerse centrados.
  Esa misma franja inferior puede incorporar un único CTA `Ver más` en variante `secondary`, siempre como acción de apoyo y sin robar protagonismo al título ni al símbolo central. La descripción debe mantenerse compacta; si excede el espacio previsto, debe truncarse visualmente pronto, antes de empujar el CTA, con un clamp corto y estable. Cuando una title ocupe más líneas o el icono central gane peso, la card debe reequilibrarse reduciendo tensión en la columna central y reservando más aire real en el footer; el CTA debe quedar siempre completamente visible, anclado al final de la card, centrado horizontalmente y con margen suficiente respecto al borde inferior incluso en los servicios con más copy. Si el CTA usa flecha, esa flecha puede desplazarse levemente a la derecha en hover como único acento de microinteracción local.
  En runtime actual, ese CTA puede usar una huella `lg` del sistema para ganar presencia y legibilidad, siempre sin competir con el heading ni convertirse en el foco principal de la card.
  Incluso en estados laterales u overlap, las cards deben mantenerse opacas; la profundidad sale de escala, rotación y orden, no de transparencia.
  No deben usar microinteracción de hover que altere geometría, escala o composición base: el patrón debe sentirse gobernado por scroll y snap. Sí se permite un `BorderGlow` perimetral sutil, guiado por proximidad de puntero, siempre que no mueva la card ni robe protagonismo al contenido.
  El patrón no debe vender sliders genéricos de agencia; debe comunicar capacidades reales del estudio: arquitectura, desarrollo, evolución y digitalización.
- `process-timeline`: sección editorial full-width de proceso con cards alternadas, nodos ilustrados y path SVG serpenteante guiado por scroll
  Los nodos desktop ilustrados deben dejar ver el asset directamente, sin anillos, dobles bordes ni círculos concéntricos añadidos por encima.
  El fondo de esos nodos debe ser opaco: la línea y cualquier capa inferior no deben transparentarse a través de la masa del hito.
  Su acento cromático debe quedar alineado con el lila azulado usado en `services-carousel`, apoyado por `Haze` como luz secundaria. Evita violetas paralelos o morados más saturados que desvíen la sección del tono de marca.
  El fondo base del bloque debe seguir el mismo `Void` oscuro del resto de secciones. La familia `Navy` no debe teñir toda la sección: queda reservada a superficies internas como cards y cierres tonales puntuales.
  Las cards de proceso deben usar como base ese mismo gradiente vertical oscuro `#0B0C17 -> #0D0F24 -> #0A0F2E`, de arriba abajo, antes de cualquier halo o overlay lila.
  Todo el texto dentro de esas cards debe resolverse en blanco: numeración, heading y descripción.
  Dentro de cada card, el acento atmosférico debe quedar contenido en la zona superior. No uses un segundo gradiente circular lila o `Haze` en la esquina inferior derecha.
  En el bloque general de la sección no debe existir glow ni en la esquina superior izquierda ni en la inferior derecha. La atmósfera base del bloque debe quedar limpia; la profundidad sale de las cards, nodos y línea.
  Puede reutilizar exactamente la misma capa de partículas del hero y de `services-carousel` como atmósfera de continuidad, siempre detrás del contenido y del path, sin crear una variante paralela ni desplazar el foco principal de cards, nodos y recorrido.
  El trazo principal de la línea puede usar un gradiente de marca en bucle, resuelto con `Haze`, `Silver` y `Lilac`, pero las transiciones deben sentirse suaves y progresivas: el inicio y el final del ciclo no pueden revelar cortes visibles ni cambios bruscos entre repeticiones. Si existe glow, ese glow debe nacer del propio stroke coloreado para heredar la tonalidad exacta de cada tramo; no se resuelve como un halo blanco o monocromo separado.
  En reposo, las imágenes de los nodos deben arrancar con opacidad contenida y una escala algo comprimida. Cuando el cluster entra en fase de activación, esa misma imagen debe ganar escala y recuperar opacidad completa de forma progresiva y coordinada con la aparición de su card.
  En móvil, la guía vertical debe pasar por el centro horizontal real de los planetas, no por el centro del antiguo nodo circular. El copy de las cards mobile puede usar un clamp más generoso que en desktop para no mutilar demasiado pronto la lectura.
  La línea puede tocar el viewport solo en su punto inicial y en su punto final. Entre nodos, debe empezar a curvar hacia el siguiente hito justo después de atravesar el nodo activo, sin volver a rozar los bordes laterales como si rebotase en ellos.
  El serpenteo debe salir de la alternancia entre hitos y del ritmo vertical del stage, no de un uso mecánico de todo el ancho disponible en cada tramo.
  Las curvas intermedias deben abrirse con amplitud generosa y radio orgánico. Evita giros tensos, handles demasiado cortos o una S excesivamente rígida entre nodos.
  Esa mayor amplitud debe concentrarse en los tramos que conectan nodos intermedios. La entrada al primer nodo y la salida desde el último deben mantenerse más contenidas para no sobreactuar el gesto en los extremos.
- `projects-showcase`: stage introductorio de portfolio con tres paneles encadenados
  El runtime activo ya resuelve un heading grande centrado y tres paneles de proyecto que ascienden desde abajo y se cubren entre sí por scroll. El patrón ya no está en fase de un solo caso: la coreografía encadena primero, segundo y tercer proyecto sobre el mismo stage.
  El heading visible debe seguir el patrón `section-heading` y acentuar la palabra semánticamente fuerte del título; en esta sección, el acento recae en `Proyectos`, no en `destacados`.
  La atmósfera del bloque debe mantenerse sobria: base `Void`, dos halos lilas muy contenidos y sin WebGL ni elementos que compitan con el hero o con `process`.
  Ningún panel debe leerse como una card. Cada proyecto se comporta como un takeover de viewport completo, con columna de lectura y media frame dominante embebidos dentro de una misma superficie full-screen.
  Mientras no exista portfolio público completo, los CTAs pueden seguir siendo no navegables y el estado del proyecto debe expresarse con copy prudente y verificable.
  La simplificación a lista vertical en móvil y tablet sigue siendo una mejora pendiente; el runtime actual comparte aún la misma surface full-screen entre breakpoints.
- `panel-base`: tarjetas y módulos principales
- `panel-muted`: soporte contextual o comparativas
- `button-primary`: CTA principal claro y luminoso
- `button-secondary`: CTA de apoyo, sin competir con el principal
  En runtime canónico, `secondary` debe hacer hover a fondo blanco con texto negro y escalar a `1.05`.
  Todas las variants de botón reutilizables deben compartir una base de motion ligera y consistente, con microescala sutil en hover y tap, sin rebotes agresivos ni desplazamientos físicos.
- `nav-pill`: navbar global alargado de una sola superficie glass con tres zonas internas sin subcápsulas
  El contorno del shell debe leerse con grosor homogéneo en todo el recorrido, sin highlights superiores que dupliquen visualmente el borde.
  Debe ocultarse al hacer scroll descendente y reaparecer al remontar o al volver cerca del top, siguiendo el patrón de `nebula-legacy`; si el menú responsive está abierto, el navbar no debe desaparecer.
  El lockup de marca visible usa el símbolo oficial oscuro seguido de la palabra `NEBULA` en Syne.
  En desktop, todos los destinos del navbar, incluido `Servicios`, vuelven a resolverse como links inline simples dentro del shell principal, sin chevrons ni previews expandidas.
  El CTA desktop del navbar debe resolverse como botón outlined estándar: transparente en reposo, borde claro, texto `Silver` y hover blanco con texto negro.
  Los links centrales deben responder al hover con una inercia suave: microescala y transición más larga con curva elástica contenida, evitando desplazamientos físicos que puedan reencender el hover al salir.
  En móvil y tablet el navbar colapsa a lockup + hamburguesa de tres líneas anclada al extremo derecho del shell, sin cápsula secundaria ni en reposo ni al abrir; el toggle debe hacer morph suave a `X` mediante transformación de barras, no por swap brusco de iconos. Al abrir, la navegación se resuelve con un overlay escalonado dark-tech a pantalla completa, usando el mismo tratamiento tipográfico para todos los destinos, incluido `Contactar`.
- `section-heading`: titulares principales de sección en `Syne`, mayoritariamente en `Silver`, con una única palabra clave en `Lilac` como acento de marca.
  Ese acento debe recaer en el término semánticamente más importante del titular y no en partículas auxiliares.
  El patrón debe sentirse preciso y contenido: un único acento por heading, sin degradados ni alternancias multicolor dentro del mismo título.
- `section-label`: microcopy técnico en mayúsculas espaciadas

## Do's and Don'ts

- **Do:** prioriza contraste, jerarquía y lectura por encima del efecto visual.
- **Do:** usa motion con significado y coste controlado.
- **Do:** usa glassmorphism solo en shells puntuales de alto nivel, como el navbar global, sin replicar pills internas innecesarias.
- **Do:** usa scroll-driven typography solo cuando el copy sea corto, contundente y siga siendo legible sin necesidad de “cazar” la animación.
- **Do:** actualiza este archivo si cambian tokens, tipografía o primitives reutilizables.
- **Don't:** abras paletas paralelas ni acentos nuevos sin decisión explícita.
- **Don't:** conviertas todo en glassmorphism o glow solo porque existe la estética dark-tech.
- **Don't:** dejes el cubo, la tipografía o los gradientes como decisiones implícitas solo en código.
