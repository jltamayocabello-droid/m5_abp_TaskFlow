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
    item.className = "task-card";

    item.innerHTML = `<div class="card-header">
          <span class="status-badge ${tarea.estado}">
            ${tarea.estado === "completada" ? "Completada" : "Pendiente"}{" "}
          </span>
          <h3>${tarea.titulo}</h3>
        </div>
        <div class="card-body">
          <p>${tarea.descripcion || "<em>Sin detalles adicionales</em>"}</p>
          <small class="date-text">📅${new Date(tarea.fechaCreacion).toLocaleString()}</small>
        </div>
        <div class="card-actions">
          <button class="btn-action btn-estado" title="Cambiar Estado">${tarea.estado === "pendiente" ? "✅Terminar" : "↺ Reabrir"}</button>
          <button class="btn-action btn-eliminar" title="Eliminar Tarea">🗑️</button>
      </div>`;

      listaTareas.appendChild(item);

    //Si la tarea está completada, le añadimos una clase virtual (CSS)
    if (tarea.estado === "completada") item.classList.add("completada");

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
  // Buscamos el elemento padre con la clase 'task-card' (LI)
  const card = event.target.closest(".task-card");
  
  if (!card) return; // Si el clic fue fuera de una tarjeta, ignoramos
  const idTarea = Number(card.id)

  // Verificamos si el clic fue en el botón de eliminar o en un hijo suyo (icono)
  if (event.target.closest(".btn-eliminar")) {
    gestor.eliminarTarea(idTarea);
    renderizarTareas();
  }

  // Lo mismo para el estado
  if (event.target.closest(".btn-estado")) {
    gestor.alternarTarea(idTarea);
    renderizarTareas();
  }
});

//==========================================
// FUNCIÓN ASÍNCRONICA PARA MANEJAR CARGA INICIAL
//==========================================

async function iniciarApp() {
  renderizarTareas(); // Marcamos lo que haya en LocalStorage

  try {
    //Llamamos a la API
    await gestor.obtenerTareasExternas();
    renderizarTareas(); //Volvemos a marcar con los nuevos datos
    console.log("App lista con datos reales");
  } catch (error) {
    //Capturamos el error
    console.error("Fallo al iniciar:", error);
  }
}

// Llamamos a la función asíncronica
iniciarApp();
