Aplicación web para la gestión de tareas-

Equipo:

Kevin Alexander Argueta Alas - Desarrollo de backend y API
Fernando Aldair Durán Amaya - Desarrollo de backend y API
William Eliseo Peñate Valle - Desarrollo de Frontend
Josué Gabriel Vásquez Echegoyén - Desarrollo de Frontend

Descripción: 
Todo API – Control de Tareas es una aplicación web desarrollada bajo una arquitectura cliente-servidor que permite la gestión eficiente de tareas mediante una API REST construida con Spring Boot.

El sistema está diseñado para permitir a los usuarios crear, consultar, actualizar y eliminar tareas (operaciones CRUD), así como marcar tareas como completadas y filtrarlas según su estado. La aplicación cuenta con un backend desarrollado en Java utilizando el framework Spring Boot, el cual expone los endpoints REST, y un frontend desarrollado con HTML, CSS y JavaScript puro que consume dichos servicios mediante peticiones HTTP usando fetch().

En el backend, las tareas se gestionan en memoria mediante una estructura de datos tipo ArrayList, lo que permite almacenar dinámicamente la información durante la ejecución del programa. Cada tarea posee un identificador único autoincremental, un título, una descripción y un estado booleano que indica si ha sido completada o no. Aunque el sistema no utiliza base de datos persistente, su diseño permite una futura integración con tecnologías como MySQL o PostgreSQL.

El frontend proporciona una interfaz moderna y responsiva que permite:

- Crear nuevas tareas mediante un formulario.

- Visualizar la lista completa de tareas registradas.

- Editar tareas existentes mediante un modal.

- Marcar tareas como completadas con un checkbox.

- Eliminar tareas con confirmación previa.

- Manejar errores en caso de que el servidor no esté disponible.

El sistema permite:

- Crear tareas
- Listar tareas
- Editar tareas
- Marcar tareas como completadas
- Eliminar tareas

Arquitectura del Proyecto:  

todo-api/
│
├── src/
│   ├── main/
│   │   ├── java/sv/edu/udb/todoapi/
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java
│   │   │   ├── model/
│   │   │   │   └── Task.java
│   │   │   ├── service/
│   │   │   │   └── TaskService.java
│   │   │   └── TodoApiApplication.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── index.css
│   │       │   └── index.js
│   │       └── application.properties
│   │
│   └── test/
│       └── TodoApiApplicationTests.java


Tecnología usada:

Backend: Spring Boot (Java)

Frontend: HTML, CSS y JavaScript

API REST + JavaScript básico (Fetch API)

Almacenamiento: En memoria (ArrayList)

Pasos para ejecutar el proyecto:

1. Ingresar al repositorio en GitHub

2. Presionar el botón Code

3. Seleccionar Download ZIP

4. Descomprimir el archivo

5. Abrir la carpeta del proyecto en IntelliJ IDEA

6. Ejecutar la clase principal: TodoApiApplication.java 
   El servidor se iniciará en: http://localhost:8080

7. Abrir en el navegador: http://localhost:8080/index.html

Funcionamiento Interno:

- Las tareas se almacenan en memoria usando ArrayList.
- Cada nueva tarea recibe un ID autoincremental.
- No utiliza base de datos.
- Al reiniciar el servidor, las tareas se eliminan.

Validaciones Implementadas:

- Manejo de errores en peticiones fetch.
- Confirmación antes de eliminar tareas.
- Confirmación para editar tareas.


