# Plan de CuentaCrece

## Alcance
CuentaCrece será una aplicación web familiar que guía a madres, padres y cuidadores desde la personalización del protagonista hasta la lectura de un cuento infantil de tres capítulos y sus actividades pedagógicas. La primera versión será autosuficiente en el navegador: el botón de generación producirá un cuento personalizado con una plantilla narrativa coherente y una salida estructurada equivalente al JSON solicitado, sin exigir credenciales externas. El backend queda preparado para integrar más adelante un motor narrativo LLM.

## Implementación
- React + TypeScript + Tailwind sobre el starter `web-db-user` ya inicializado.
- Una sola ruta `/` con dos estados principales: editor guiado y lector del cuento.
- Estado local para el formulario, el paso actual y el cuento generado; no se requiere base de datos para el MVP.
- Generación local: construir título, capítulos y ejercicios a partir de los campos del formulario, adaptando el copy de forma ligera por edad y tema.
- Diseño responsive y accesible con controles de formulario claros, navegación por pasos, resumen lateral y acciones de volver a editar, imprimir y comenzar otra historia.
- `public/manus-routes.json` declara la ruta `/`.

## Estructura
- `client/src/pages/Home.tsx`: flujo completo de creación, resumen y lectura.
- `client/src/index.css`: tokens visuales, tipografía, layout, estados y motion.
- `client/src/App.tsx`: routing de la aplicación.
- `client/public/`: archivos públicos sincronizados por Vite.
- `public/manus-routes.json`: manifiesto de rutas para Preview y publicación.
- `server/`: starter Express/tRPC conservado para futuras integraciones con LLM y persistencia.

## Diseño

### Estilos considerados
- **Editorial de cuento ilustrado** — 0.07: papel marfil, lavanda, coral y trazos dibujados, con una lectura acogedora.
- **Taller Montessori contemporáneo** — 0.06: colores primarios suaves, tarjetas didácticas y controles muy silenciosos.
- **Cosmos nocturno de aventuras** — 0.04: azul tinta, estrellas y progresión más fantástica.

### Dirección elegida: Editorial de cuento ilustrado
- **Movimiento:** libro infantil editorial contemporáneo con guiños de risografía y papelería artesanal.
- **Principios:** calidez antes que tecnología; jerarquía de lectura evidente; formularios con ritmo de historia; detalles lúdicos sin ruido.
- **Filosofía de color:** marfil y tinta ciruela aportan calma y legibilidad; coral y amarillo mantequilla marcan acciones y energía; lavanda sirve como puente entre lo pedagógico y lo imaginativo.
- **Paradigma de layout:** una columna de lectura amplia acompañada por un margen lateral tipo índice de libro; en móvil, el margen se convierte en una barra de progreso superior.
- **Elementos firma:** sello circular “hecho para ti”, estrellas de cuatro puntas como separadores y una línea ondulada de cuaderno bajo cada título.
- **Interacción:** cada campo debe sentirse como una invitación breve. Los ejemplos rápidos reducen el esfuerzo de escritura. El botón principal siempre explica el siguiente capítulo del flujo.
- **Animación:** entrada suave por desplazamiento y opacidad al avanzar; estados de carga con estrellas que pulsan; evitar loops llamativos durante la lectura.
- **Tipografía:** `DM Sans` para interfaz y cuerpo; `Fraunces` para títulos, capítulos y palabras emocionales.
- **Esencia de marca:** “El cuento donde tu peque siempre encuentra una forma de brillar.” Personalidad: cercana, imaginativa, cuidadosa.
- **Voz:** titulares breves y cómplices. CTA ejemplo: “Escribir mi cuento”; microcopy: “Tú pones la chispa. Nosotros ordenamos la aventura.”
- **Wordmark:** una estrella de cuatro puntas integrada en la “C” de CuentaCrece, como una pegatina sobre una página.
- **Color propio:** coral arcilla `#E47765`, usado en botones, sellos y momentos de avance.
