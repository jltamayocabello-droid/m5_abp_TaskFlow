import { GestorTareas } from "./classes/GestorTareas.js";

//==========================================
// REFERENCIAS AL DOM
//==========================================

//Capturamos los elementos del HTML usando los IDs

const formulario = document.querySelector("#form-tarea");
const listaTareasPendientes = document.querySelector("#lista-tareas-pendientes");
const listaTareasCompletadas = document.querySelector("#lista-tareas-completadas");
const inputTitulo = document.querySelector("#input-titulo");
const inputDescripcion = document.querySelector("#input-descripcion");
const inputFecha = document.querySelector("#input-fecha");

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
  const fechaVencimiento = inputFecha.value || null; // Capturamos la fecha (puede ser null)

  if (titulo === "") return; //Si está vacío no hace nada

  // Crear tarea usando GESTOR con fecha de vencimiento
  const nuevaTarea = gestor.agregarTarea(titulo, descripcion, fechaVencimiento);

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
  // Limpiamos ambas listas
  listaTareasPendientes.innerHTML = "";
  listaTareasCompletadas.innerHTML = "";

  // Separamos las tareas por estado
  const tareasPendientes = gestor.tareas.filter(t => t.estado === "pendiente");
  const tareasCompletadas = gestor.tareas.filter(t => t.estado === "completada");

  // Renderizamos tareas pendientes
  tareasPendientes.forEach((tarea) => {
    const item = crearTarjetaTarea(tarea);
    listaTareasPendientes.appendChild(item);
  });

  // Renderizamos tareas completadas
  tareasCompletadas.forEach((tarea) => {
    const item = crearTarjetaTarea(tarea);
    listaTareasCompletadas.appendChild(item);
  });
}

// Función auxiliar para crear una tarjeta de tarea
function crearTarjetaTarea(tarea) {
  // Creamos el contenedor de la tarjeta (<li>)
  const item = document.createElement("li");
  item.id = tarea.id; //Guardamos el ID para usarlo luego (borrar/editar)
  item.className = "task-card";

  // Verificar si la tarea tiene fecha de vencimiento y si está vencida
  let fechaVencimientoHTML = '';
  let claseVencida = '';

  if (tarea.fechaVencimiento) {
    const fechaVenc = new Date(tarea.fechaVencimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas

    const esVencida = fechaVenc < hoy && tarea.estado === 'pendiente';
    claseVencida = esVencida ? 'vencida' : '';

    const icono = esVencida ? '⚠️' : '⏰';
    fechaVencimientoHTML = `<small class="due-date ${claseVencida}">${icono} Vence: ${fechaVenc.toLocaleDateString('es-ES')}</small>`;
  }

  item.innerHTML = `<div class="card-header">
        <h3>${tarea.titulo}</h3><span class="status-badge ${tarea.estado}">
            ${tarea.estado === "completada" ? "Completada" : "Pendiente"}
          </span>
        </div>
        <div class="card-body">
          <p>${tarea.descripcion || "<em>Sin detalles adicionales</em>"}</p>
          <div class="task-dates">
            <small class="date-text">📅 Creada: ${new Date(tarea.fechaCreacion).toLocaleDateString('es-ES')}</small>
            ${fechaVencimientoHTML}
          </div>
        </div>
        <div class="card-actions">
          <button class="btn-action btn-estado" title="Cambiar Estado">${tarea.estado === "pendiente" ? "✅Terminar" : "↺ Reabrir"}</button>
          <button class="btn-action btn-eliminar" title="Eliminar Tarea">🗑️</button>
      </div>`;

  //Si la tarea está completada, le añadimos una clase virtual (CSS)
  if (tarea.estado === "completada") item.classList.add("completada");

  // Si la tarea está vencida, añadimos clase
  if (claseVencida) item.classList.add(claseVencida);

  return item;
}

//==========================================
// LISTA TAREAS (Listeners para ambas listas)
//==========================================

// Función auxiliar para manejar clics en las tarjetas
function manejarClicTarea(event) {
  // Buscamos el elemento padre con la clase 'task-card' (LI)
  const card = event.target.closest(".task-card");

  if (!card) return; // Si el clic fue fuera de una tarjeta, ignoramos
  const idTarea = Number(card.id);

  // Verificamos si el clic fue en el botón de eliminar
  if (event.target.closest(".btn-eliminar")) {
    gestor.eliminarTarea(idTarea);
    renderizarTareas();
  }

  // Verificamos si el clic fue en el botón de estado
  if (event.target.closest(".btn-estado")) {
    gestor.alternarTarea(idTarea);
    renderizarTareas(); // Re-renderiza y mueve la tarea a la lista correspondiente
  }
}

// Agregamos listeners a ambas listas
listaTareasPendientes.addEventListener("click", manejarClicTarea);
listaTareasCompletadas.addEventListener("click", manejarClicTarea);

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
