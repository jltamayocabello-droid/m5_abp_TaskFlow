import { GestorTareas } from "./classes/GestorTareas.js";

// GESTOR DE TAREAS
const gestor = new GestorTareas();

//==========================================
// REFERENCIAS AL DOM
//==========================================

//Capturamos los elementos del HTML usando los IDs
const formulario = document.querySelector("#form-tarea");
const inputTitulo = document.querySelector("#input-titulo");
const inputDescripcion = document.querySelector("#input-descripcion");
const listaTareas = document.querySelector("#lista-tareas");

//PRUEBA DE CONEXION
console.log("Elementos DOM capturados:", {
  formulario,
  inputTitulo,
  listaTareas,
});

//==========================================
// EVENTOS (La interactividad)
//==========================================

// Capturamos el evento submit del formulario
formulario.addEventListener("submit", (event) => {
  // Detenemos la recarga automática de la web
  event.preventDefault();

  // Validamos que haya texto en el input
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();

  if (titulo === "") return; //Si está vacío no hace nada

  // Crear tarea usando GESTOR
  const nuevaTarea = gestor.agregarTarea(titulo, descripcion);

  // Depuración (Verificamos en consola que se creó)
  console.log("Tarea creada:", nuevaTarea);
  console.log("Lista actual:", gestor.tareas);

  // Limpiamos el formulario
  formulario.reset();
});
