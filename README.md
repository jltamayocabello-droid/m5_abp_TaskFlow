# 📝 PROYECTO ABP M5: TaskFlow

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-yellow)
![Stack](https://img.shields.io/badge/Stack-HTML5_%7C_CSS_%7C_JavaScript-blue)

## 📖 Descripción del Proyecto

**Unidad solicitante:** Departamento de Desarrollo Web

El equipo de desarrollo ha recibido el encargo de construir una aplicación web interactiva basada en JavaScript. La problemática a resolver es ofrecer una herramienta funcional que permita a los usuarios gestionar tareas de manera eficiente. Se utilizará un enfoque basado en la orientación a objetos, eventos del DOM y consumo de APIs para lograr una aplicación moderna y escalable.

### 🎯 Objetivo

Desarrollar una aplicación web interactiva que permita gestionar tareas de manera eficiente utilizando JavaScript moderno. Se implementarán principios de programación orientada a objetos, manipulación del DOM, eventos, asincronía y consumo de APIs para crear una herramienta escalable y funcional.

La aplicación web permite a los usuarios:

- ✅ Crear, editar y eliminar tareas.
- ✅ Utilizar eventos para mejorar la interactividad.
- ✅ Manejar datos de manera asincrónica.
- ✅ Integrar consumo de APIs para funcionalidades adicionales.
- ✅ Separar tareas por estado (pendientes/completadas).
- ✅ Alternar entre modo claro y oscuro.

---

## 🛠️ Requerimientos Técnicos

Este proyecto cumple con los siguientes estándares de evaluación SENCE:

- ✅ **Orientación a Objetos**: Implementación de clases `Tarea` y `GestorTareas`.
- ✅ **Sintaxis ES6+**: Uso de módulos, arrow functions, template literals, async/await.
- ✅ **Manipulación del DOM**: Creación dinámica de elementos y event delegation.
- ✅ **Manejo de Eventos**: Listeners para formularios, botones y acciones de usuario.
- ✅ **Programación Asíncrona**: Uso de `async/await` y manejo de promesas.
- ✅ **Consumo de API**: Integración con JSONPlaceholder para importar tareas externas.
- ✅ **Persistencia de Datos**: LocalStorage para guardar tareas y preferencias.
- ✅ **Código Limpio**: Organización modular y comentarios descriptivos.

---

## 📂 Documentación Técnica

### 1. Stack Tecnológico

- **HTML5**: Estructura semántica y accesibilidad.
- **CSS3**: Diseño moderno con glassmorphism y gradientes vibrantes.
- **JavaScript ES6+**: Lógica de aplicación con módulos y programación orientada a objetos.
- **LocalStorage API**: Persistencia de datos en el navegador.
- **JSONPlaceholder API**: Consumo de datos externos para tareas de ejemplo.
- **Git/GitHub**: Control de versiones y colaboración.

### 2. Estructura del Proyecto

```
m5_abp_proyecto-final/
│
├── index.html                 # Página principal
├── README.md                  # Documentación del proyecto
│
├── assets/
│   └── css/
│       └── styles.css         # Estilos con variables CSS y glassmorphism
│
└── js/
    ├── main.js                # Punto de entrada y lógica principal
    └── classes/
        ├── Tarea.js           # Clase modelo de tarea
        └── GestorTareas.js    # Gestor de colección de tareas
```

### 3. Arquitectura de Clases

#### Clase `Tarea` (Modelo)

```javascript
class Tarea {
  #id;                          // Campo privado
  constructor(titulo, descripcion, id)
  get id()                      // Getter para ID
  cambiarEstado()               // Alterna entre pendiente/completada
}
```

**Propiedades:**

- `id`: Identificador único (privado)
- `titulo`: Título de la tarea
- `descripcion`: Descripción opcional
- `estado`: 'pendiente' o 'completada'
- `fechaCreacion`: Timestamp de creación

#### Clase `GestorTareas` (Controlador)

```javascript
class GestorTareas {
  constructor()                             // Carga tareas desde localStorage
  agregarTarea(titulo, desc, fechaVenc)     // Crea y persiste nueva tarea
  eliminarTarea(id)                         // Elimina tarea por ID
  alternarTarea(id)                         // Cambia estado de tarea
  guardar()                                 // Persiste en localStorage
  async obtenerTareasExternas()             // Consume y mapea datos de API
}
```

### 4. Funcionalidades Principales

#### 📋 Gestión de Tareas (CRUD)

- **Creación Inteligente**: Formulario con validación y captura de fecha de vencimiento.
- **Persistencia Robusta**: Uso de `localStorage` para mantener la sesión del usuario.
- **Movimiento de Estados**: Las tareas se mueven automáticamente entre "Pendientes" y "Completadas".
- **Eliminación Directa**: Limpieza inmediata tanto del DOM como del almacenamiento local.

#### ⏰ Control de Vencimientos

- **Feedback Visual**: Icono de reloj (⏰) para tareas a tiempo y advertencia (⚠️) para vencidas.
- **Alertas de Tiempo**: Los títulos de tareas vencidas cambian de color para llamar la atención del usuario.
- **Cálculo Dinámico**: La aplicación verifica la fecha actual vs la fecha límite en cada renderización.

#### 🌐 Integración Asíncrona

- **Consumo de API**: Importación inicial de 5 tareas aleatorias desde JSONPlaceholder.
- **Mapeo de Datos**: Los datos externos se transforman dinámicamente en objetos de la clase `Tarea`.
- **Prevención de Duplicados**: Sistema de banderas en `localStorage` para evitar re-importaciones.

#### 🎨 Experiencia de Usuario (UI/UX)

- **Diseño Glassmorphism**: Estética moderna con fondos translúcidos y desenfoque.
- **Modo Oscuro**: Selector de tema con persistencia de preferencia.
- **Diseño Adaptable**: Interfaz optimizada para móviles, tablets y escritorio.

---

## 🚀 Cómo ejecutar este proyecto

Para visualizar este proyecto:

### 1. Clonar el repositorio:

```bash
git clone https://github.com/jltamayocabello-droid/m5_abp_taskflow.git
cd m5_abp_taskflow
```

### 2. Abrir en el navegador:

- **Opción A**: Abre el archivo `index.html` directamente en tu navegador.
- **Opción B**: Usa la extensión **Live Server** de VS Code para desarrollo local.

### 3. Uso de la aplicación:

1. **Crear tarea**: Completa el formulario y haz clic en "Agregar Nueva Tarea"
2. **Completar tarea**: Haz clic en "✅ Terminar" en una tarea pendiente
3. **Reabrir tarea**: Haz clic en "↺ Reabrir" en una tarea completada
4. **Eliminar tarea**: Haz clic en el icono 🗑️
5. **Cambiar tema**: Haz clic en el botón 🌓 en el header

---

## 🌐 Despliegue (Demo)

- **Repositorio GitHub**: 🔗 [https://github.com/jltamayocabello-droid/m5_abp_taskflow](https://github.com/jltamayocabello-droid/m5_abp_taskflow)
- **Deploy del proyecto**: 🔗 [https://jltamayocabello-droid.github.io/m5_abp_taskflow/](https://jltamayocabello-droid.github.io/m5_abp_taskflow/)

---

## 💡 Justificación de Decisiones Técnicas

### Programación Orientada a Objetos

**Decisión**: Separación en clases `Tarea` y `GestorTareas`.

**Justificación**:

- **Separación de responsabilidades**: `Tarea` maneja datos individuales, `GestorTareas` maneja la colección.
- **Encapsulación**: Campo privado `#id` previene modificaciones accidentales.
- **Reutilización**: Las clases pueden extenderse fácilmente para nuevas funcionalidades.

### Módulos ES6

**Decisión**: Uso de `import`/`export` en lugar de scripts globales.

**Justificación**:

- **Namespace limpio**: Evita contaminación del scope global.
- **Dependencias explícitas**: Fácil identificar qué módulos usa cada archivo.
- **Optimización**: Los navegadores modernos pueden hacer tree-shaking.

### LocalStorage vs Base de Datos

**Decisión**: Persistencia con `localStorage`.

**Justificación**:

- **Simplicidad**: No requiere backend ni configuración de servidor.
- **Rendimiento**: Acceso instantáneo sin latencia de red.
- **Privacidad**: Los datos permanecen en el dispositivo del usuario.

### Async/Await vs Promises

**Decisión**: Sintaxis `async/await` para operaciones asíncronas.

**Justificación**:

- **Legibilidad**: Código más limpio y fácil de seguir.
- **Manejo de errores**: Try/catch más intuitivo que `.catch()`.
- **Estándar moderno**: Mejor práctica en JavaScript 2024-2025.

### Separación de Tareas por Estado

**Decisión**: Dos listas independientes (pendientes/completadas).

**Justificación**:

- **UX mejorada**: El usuario ve claramente qué está pendiente y qué está hecho.
- **Organización visual**: Reduce la carga cognitiva al separar contextos.
- **Motivación**: Ver tareas completadas genera sensación de progreso.

---

## 📱 Funcionalidades Destacadas

| Funcionalidad       | Descripción                                                |
| ------------------- | ---------------------------------------------------------- |
| 📝 Crear Tareas     | Formulario con validación y feedback visual                |
| ✅ Completar Tareas | Cambio de estado con movimiento automático entre secciones |
| 🗑️ Eliminar Tareas  | Eliminación con actualización inmediata del DOM            |
| 💾 Persistencia     | Datos guardados en localStorage                            |
| 🌐 API Externa      | Importación inicial de tareas desde JSONPlaceholder        |
| 🌓 Modo Oscuro      | Toggle con persistencia de preferencia                     |
| 📱 Responsive       | Adaptable a todos los tamaños de pantalla                  |
| 🎨 Glassmorphism    | Diseño moderno con efectos de vidrio                       |

---

## 🧪 Testing Manual

Para verificar el correcto funcionamiento:

1. **Crear tarea**: Debe aparecer en "Tareas Pendientes"
2. **Marcar como completada**: Debe moverse a "Tareas Completadas"
3. **Reabrir tarea**: Debe volver a "Tareas Pendientes"
4. **Eliminar tarea**: Debe desaparecer de la lista
5. **Recargar página**: Las tareas deben persistir
6. **Cambiar tema**: El modo oscuro debe mantenerse tras recargar
7. **Primera carga**: Deben importarse 5 tareas de la API
8. **Segunda carga**: No deben duplicarse las tareas de la API

---

## 📚 Recursos y Referencias

- [MDN Web Docs - JavaScript Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [MDN Web Docs - Async/Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [CSS Glassmorphism](https://css.glass/)

---

## ✒️ Autor

**Jorge Tamayo Cabello**

_Estudiante de Desarrollo Front-End Trainee - SENCE_

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para SENCE y está disponible con fines educativos.

---

## 🙏 Agradecimientos

- **SENCE** por la formación en desarrollo Front-End
- **JSONPlaceholder** por proporcionar una API gratuita para testing
- **Comunidad MDN** por la documentación exhaustiva de JavaScript
