import { GestorTareas } from "./classes/GestorTareas.js";

//==========================================
// REFERENCIAS AL DOM
//==========================================

//Capturamos los elementos del HTML usando los IDs

const formulario = document.querySelector("#form-tarea");
const listaTareas = document.querySelector("#lista-tareas");
const inputTitulo = document.querySelector("#input-titulo");
const inputDescripcion = document.querySelector("#input-descripcion");

//==========================================
// GESTOR DE TAREAS
//==========================================

const gestor = new GestorTareas();
renderizarTareas();


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

  //Pintar datos
  renderizarTareas();

  // Depuración (Verificamos en consola que se creó)
  console.log("Tarea creada:", nuevaTarea);

  // Limpiamos el formulario
  formulario.reset();
});

//==========================================
// FUNCIÓN DE RENDERIZADO
//==========================================

function renderizarTareas() {
  // Limpiamos la lista de tareas
  listaTareas.innerHTML = "";

  // Recorremos las tareas
  gestor.tareas.forEach((tarea) => {

    // Creamos el contenedor de la tarjeta (<li>)
    const item = document.createElement("li");
    item.id = tarea.id; //Guardamos el ID para usarlo luego (borrar/editar)

    //Si la tarea está completada, le añadimos una clase virtual (CSS)
    if (tarea.estado === 'completada') item.classList.add('completada');

    // Creamos el contenido
    //Título
    const titulo = document.createElement("h3");
    titulo.textContent = tarea.titulo;

    //Descripción
    const descripcion = document.createElement("p");
    descripcion.textContent = tarea.descripcion;

    //Boton de Estado (Check)
    const btnEstado = document.createElement("button");
    btnEstado.className = "btn-estado";
    btnEstado.textContent = tarea.estado === "pendiente" ? "✅" : "↺";

    //Botón de Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "🗑️";

    //Armamos la tarjeta
    item.appendChild(titulo);
    item.appendChild(descripcion);
    //Creamos un div para los botones   
    const acciones = document.createElement("div");
    acciones.appendChild(btnEstado);
    acciones.appendChild(btnEliminar);
    item.appendChild(acciones);

    //Agregamos la tarjeta a la lista principal
    listaTareas.appendChild(item);
  

});
}


//==========================================
// LISTA TAREAS (Listener)
//==========================================

// 
listaTareas.addEventListener("click", (event) => {

  // Capturamos el ID (ID de li más cercano)
  const idTarea = Number(event.target.closest("li").id);

  // Hizo clic en el botón eliminar
  // Borrar tarea
  if (event.target.classList.contains("btn-eliminar")) {
    gestor.eliminarTarea(idTarea);
    renderizarTareas();
  }

  // Hizo clic en el botón estado
  if (event.target.classList.contains("btn-estado")) {
    gestor.alternarTarea(idTarea);
    renderizarTareas();
  }
})