# Desarrollo del Sitio Web - Hotel El Rincón de Camila

**Hotel El Rincón de Camila** está construyendo un sitio web sencillo, agradable y funcional para atraer más clientes y gestionar las reservas de sus habitaciones. Tu tarea es desarrollar un sitio web pequeño, amigable y visualmente atractivo que cumpla con los siguientes requisitos:

## Requerimientos del Proyecto

### Requerimientos Generales del Sitio Web

- [ ] Crear un sitio web visualmente atractivo, sencillo y funcional.
- [X] Diseñar con enfoque **mobile-first**, ya que la mayoría de los usuarios accederán al sitio desde dispositivos móviles.
- [X] Asegurarse de que el sitio contenga al menos 3 páginas:
  - **Página de Inicio (Landing Page)**:
    - [X] Mostrar una página de inicio agradable con elementos como un carrusel de habitaciones, áreas del hotel y fotos de los servicios (comida, spa, zonas húmedas, etc.).
  - **Página de Consulta de Disponibilidad y Reservas**:
    - [X] Los usuarios deben poder consultar la disponibilidad de habitaciones ingresando:
      - [X] Fechas de estancia.
      - [X] Número de personas.
    - [X] Mostrar las habitaciones disponibles según los filtros, incluyendo:
      - [X] Detalles de la habitación (número de camas, servicios como internet, minibar, jacuzzi, etc.).
      - [X] Precio total y fechas disponibles.
    - [X] Permitir a los usuarios reservar habitaciones si están satisfechos con los detalles.
  - **Página de Contacto**:
    - [X] Incluir la ubicación y la información de contacto del hotel.
    - [X] Proveer diferentes formas para que los usuarios se comuniquen con el hotel (teléfono, correo electrónico, etc.).

### Funcionalidades

- [X] Agregar un **botón de comunicación por WhatsApp** en todas las páginas:
  - [X] El botón debe flotar verticalmente en el lado izquierdo y ser visible mientras el usuario navega por el sitio.
  - [X] Al hacer clic en el botón, debe abrir una nueva pestaña con WhatsApp para comunicarse con el hotel.

- **Reservas y Gestión de Habitaciones**:
  - [X] Permitir que solo los **usuarios registrados** puedan hacer y cancelar reservas.
  - [ ] En la página de reservas, mostrar:
    - [X] Habitaciones disponibles que coincidan con los filtros (fechas, número de personas).
    - [X] Detalle del precio, incluyendo número de noches y número de personas.
  - [X] Mostrar información clara sobre la **hora de check-in** (14:00) y **política de expiración de la reserva** (si la reserva no es efectiva antes de las 16:00, la habitación se liberará).
  - [X] Asegurarse de que después de hacer clic en "Reservar", el sistema verifique si la habitación sigue disponible:
    - [X] Si está disponible, proceder con la reserva.
    - [X] Si no está disponible, notificar al usuario que la habitación ya no está disponible.
  - [ ] Permitir que los usuarios **cancelen** una reserva de forma sencilla.
  - [ ] Proveer información clara sobre la **política de cancelación** de reservas del hotel.

### Funcionalidades Adicionales

- [ ] Asegurar que el sitio sea fácil de usar y **responsivo** en todos los dispositivos, no solo móviles.
- [X] Proveer una **interfaz intuitiva** y fácil de usar para la búsqueda de disponibilidad y la realización de reservas.
- [X] Utilizar **json-server** para la persistencia de datos y el manejo de reservas.
- [X] Hospedar y desplegar el sitio web en **GitHub Pages**.
- [X] Utilizar **GitHub** para el control de versiones y la gestión del repositorio del proyecto.

### Características Adicionales (Opcionales)

- [ ] Agregar características adicionales que mejoren la experiencia del usuario, sin interferir con las funcionalidades principales (por ejemplo, gestión de cuentas de usuario, galería de detalles de habitaciones).

## Directrices de Desarrollo

- [ ] Mantener el código **simple y bien estructurado**.
- [X] Usar **HTML**, **CSS** y **JavaScript** siguiendo las mejores prácticas.
- [ ] Asegurar que el sitio sea **accesible** y siga las **WCAG** (Web Content Accessibility Guidelines).
- [ ] Proveer **documentación** y comentarios adecuados en el código para asegurar su mantenibilidad.
- [X] Seguir el enfoque **mobile-first** en el diseño y desarrollo del sitio web.

---

Puedes agregar características o mejoras adicionales que estén alineadas con los objetivos del proyecto, asegurando siempre que la experiencia para el usuario sea sencilla y funcional.
