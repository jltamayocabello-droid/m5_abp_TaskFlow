import { Tarea } from "./Tarea.js";

export class GestorTareas {
    constructor() {
        // Recuperar tareas antiguas
        const tareasGuardadas = JSON.parse(localStorage.getItem("misTareas"));
        // Si hay datos, usamos esos, si no, usamos un array vacio
        // Mapeamos para que vuelvan a ser objetos de Tarea
        this.tareas = tareasGuardadas ? tareasGuardadas.map(tarea => {
            // Pasamos titulo, descripcion e ID original al constructor
            const tareaRecuperada = new Tarea(tarea.titulo, tarea.descripcion, tarea.id);

            // Restauramos los datos antiguos
            tareaRecuperada.estado = tarea.estado; // Recuperamos el estado original
            tareaRecuperada.fechaCreacion = new Date(tarea.fechaCreacion); // Recuperamos la fecha original 

            return tareaRecuperada;

    }) : [];
    }

    // Método para agregar una tarea
    agregarTarea(titulo, descripcion) {
        // Crear una nueva tarea
        const nuevaTarea = new Tarea(titulo, descripcion);

        this.tareas.push(nuevaTarea); // Guardar una nueva tarea
        this.guardar(); // Guardamos cambios

        return nuevaTarea; //Retornamos la tarea recién creada
    }

    // Método para eliminar una tarea
    eliminarTarea(Id){
        const idNumerico = Number(Id)
        // Sobreescribimos el array filtrando todos los que No tengan ese ID
        this.tareas = this.tareas.filter(tarea => tarea.id !== idNumerico);
        this.guardar(); // Guardamos cambios
    }

    // Método para alternar el estado de una tarea
    alternarTarea(Id) {
        const idNumerico = Number(Id)
        // Buscamos la tarea especifica
        const tarea = this.tareas.find(tarea => tarea.id === idNumerico);
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
// OBTENER LOS DATOS DE LA API
//==========================================

async obtenerTareasExternas() {
    try {
        // Petición GET (fetch devuelve una promesa)
        // Limit=5 para no sobrecargar la API
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');

        // Validación: ¿El servidor respondió bien?
        if (!respuesta.ok) throw new Error("No se pudo conectar con el servidor de tareas");
        
        // Convertimos la respuesta a JSON
        const usuarios = await respuesta.json();

        // Procesamos cada usuario
        usuarios.forEach(usuario => {
            // Control de duplicados
            const existe = this.tareas.some(t => t.id === usuario.id);

            // Si no existe, lo agregamos
            if (!existe) {
                // Personalización de nombres
                const nuevaTarea = new Tarea(
                    `📞 Llamar a ${usuario.name}`, 
                        `Ciudad: ${usuario.address.city} | User: ${usuario.username}`,
                        usuario.id //
                );

                this.tareas.push(nuevaTarea);
            }

        });

        this.guardar(); // Guardamos cambios
        return true;

    } catch (error) {
        console.error(error);
        throw error; // Re-lanzamos el error que main.js lo capture
    }
}

}