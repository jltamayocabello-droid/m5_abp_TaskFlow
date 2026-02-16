import { Tarea } from "./Tarea.js";

export class GestorTareas {
    constructor() {
        // Recuperar tareas antiguas
        const tareasGuardadas = JSON.parse(localStorage.getItem("misTareas"));
        // Si hay datos, usamos esos, si no, usamos un array vacio
        // Mapeamos para que vuelvan a ser objetos de Tarea
        this.tareas = tareasGuardadas ? tareasGuardadas.map(tarea => 
            { const tareaRecuperada = new Tarea(tarea.titulo, tarea.descripcion);
            tareaRecuperada.id = tarea.id; // Recuperamos el ID original
            tareaRecuperada.estado = tarea.estado; // Recuperamos el estado original
            return tareaRecuperada;
    }) : [];
    }

    // Método para agregar una tarea
    agregarTarea(titulo, descripcion) {
        // Crear una nueva tarea
        const nuevaTarea = new Tarea(titulo, descripcion);

        // Guardar una nueva tarea
        this.tareas.push(nuevaTarea);


        this.guardar(); // Guardamos cambios

        //Retornamos la tarea recién creada
        return nuevaTarea;
    }

    // Método para eliminar una tarea
    eliminarTarea(Id){
        // Sobreescribimos el array filtrando todos los que No tengan ese ID
        this.tareas = this.tareas.filter(tarea => tarea.id !== Id);
        this.guardar(); // Guardamos cambios
    }

    // Método para alternar el estado de una tarea
    alternarTarea(Id) {
        // Buscamos la tarea especifica
        const tarea = this.tareas.find(tarea => tarea.id === Id);
        if (tarea) {
            tarea.cambiarEstado();
            this.guardar(); // Guardamos cambios
        } 
    }

    // Método para guardar los cambios
    guardar() {
        localStorage.setItem("misTareas", JSON.stringify(this.tareas));
    }

//==========================================
// Método para simular una carga de datos externa
//==========================================
cargarTareasFalsas() {
    //Retornamos una nueva promesa 
    
    return new Promise((resolve, reject) => {
        console.log("Cargando tareas falsas");

        //Usamos setTimeour para simular el retraso de 2 segundos
        setTimeout(() => {

        //Simulamos que todo salio bien
        const exito = true;

        if (exito) {
            // Datos ficticios que llegaron del servidor
            const tareasSimuladas = [
                {id: 1, titulo: "Tarea Servidor 1", descripcion: "Descripción Servidor 1", estado: "pendiente"},
                {id: 2, titulo: "Tarea Servidor 2", descripcion: "Descripción Servidor 2", estado: "completada"},
            ];

            // Resolvemos la promesa entregando los datos
            resolve(tareasSimuladas);
        } else {
            // Resolvemos la promesa con un error
            reject("Hubo un error al cargar las tareas");
        }
        }, 2000); // 2 segundos);
    });

}

//==========================================
// OBTENER LOS DATOS DE LA API
//==========================================

async obtenerTareasExternas() {
    try {
        // Petición GET (fetch devuelve una promesa)
        // Limit=5 para no sobrecargar la API
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');

        // Validación: ¿El servidor respondió bien?
        if (!respuesta.ok) {
            throw new Error("No se pudo conectar con el servidor de tareas");
        }

        // Convertimos la respuesta a JSON
        const datosJSON = await respuesta.json();

        // Adaptación (La API usa title y completed)
        // Transformamos a nuestra clase Tarea (titulo, estado)
        const tareasNuevas = datosJSON.map(item => {
            const t = new Tarea(item.title, "Tarea importada desde API externa");
            if (item.completed) t.cambiarEstado(); // Si la API dice que está lista, la marcamos
            return t;
        });

        // Integración (Las sumamos a nuestras tareas actuales y guardamos)
        this.tareas = [...this.tareas, ...tareasNuevas];
        this.guardar();

        return true; // Indicamos que todo salió bien
    } catch (error) {
        console.error(error);
        throw error; // Re-lanzamos el error que main.js lo capture
    }
}
}