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
        <h3>${tarea.titulo}</h3><span class="status-badge ${tarea.estado}">
            ${tarea.estado === "completada" ? "Completada" : "Pendiente"}
          </span>
        </div>
        <div class="card-body">
          <p>${tarea.descripcion || "<em>Sin detalles adicionales</em>"}</p>
          <small class="date-text">📅${new Date(tarea.fechaCreacion).toLocaleString()}</small>
        </div>
        <div class="card-actions">
          <button class="btn-action btn-estado" title="Cambiar Estado">${tarea.estado === "pendiente" ? "✅Terminar" : "↺ Reabrir"}</button>
          <button class="btn-action btn-eliminar" title="Eliminar Tarea">🗑️</button>
          <span class="status-badge ${tarea.estado}"></span>
      </div>`;

    //Si la tarea está completada, le añadimos una clase virtual (CSS)
    if (tarea.estado === "completada") item.classList.add("completada");

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

//==========================================
// MODAL 
//==========================================

// Lógica para el Modo Oscuro
const btnTema = document.getElementById('theme-toggle');
const body = document.body;

// Recuperar preferencia del usuario (Manual #1: LocalStorage)
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado) {
  body.setAttribute('data-theme', temaGuardado);
}

btnTema.addEventListener('click', () => {
  // Si ya es dark, lo quitamos, si no, lo ponemos
  const esDark = body.getAttribute('data-theme') === 'dark';
  const nuevoTema = esDark ? 'light' : 'dark';

  body.setAttribute('data-theme', nuevoTema);
  localStorage.setItem('tema', nuevoTema); // Guardar preferencia
});
