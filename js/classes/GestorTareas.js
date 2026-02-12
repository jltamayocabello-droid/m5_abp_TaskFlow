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

}