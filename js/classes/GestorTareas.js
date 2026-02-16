import { Tarea } from "./Tarea.js";

export class GestorTareas {
    constructor() {
        // Recuperar tareas antiguas
        const tareasGuardadas = JSON.parse(localStorage.getItem("misTareas"));
        // Si hay datos, usamos esos, si no, usamos un array vacio
        // Mapeamos para que vuelvan a ser objetos de Tarea
        this.tareas = tareasGuardadas ? tareasGuardadas.map(tarea => {
            // Pasamos titulo, descripcion, ID original y fechaVencimiento al constructor
            const tareaRecuperada = new Tarea(
                tarea.titulo,
                tarea.descripcion,
                tarea.id,
                tarea.fechaVencimiento // Recuperamos la fecha de vencimiento
            );

            // Restauramos los datos antiguos
            tareaRecuperada.estado = tarea.estado; // Recuperamos el estado original
            tareaRecuperada.fechaCreacion = new Date(tarea.fechaCreacion); // Recuperamos la fecha original 

            return tareaRecuperada;

        }) : [];
    }

    // Método para agregar una tarea
    agregarTarea(titulo, descripcion, fechaVencimiento = null) {
        // Crear una nueva tarea
        const nuevaTarea = new Tarea(titulo, descripcion, Date.now(), fechaVencimiento);

        this.tareas.push(nuevaTarea); // Guardar una nueva tarea
        this.guardar(); // Guardamos cambios

        return nuevaTarea; //Retornamos la tarea recién creada
    }

    // Método para eliminar una tarea
    eliminarTarea(Id) {
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
            // Verificar si ya se importaron las tareas externas anteriormente
            const yaImportadas = localStorage.getItem("tareasExternasImportadas");

            // Si la bandera está activa PERO no hay tareas, resetear la bandera
            if (yaImportadas === "true" && this.tareas.length === 0) {
                console.log("⚠️ Bandera activa pero sin tareas. Reseteando...");
                localStorage.removeItem("tareasExternasImportadas");
            }

            // Si ya se importaron Y hay tareas, no volver a importar
            if (yaImportadas === "true" && this.tareas.length > 0) {
                console.log("✅ Tareas externas ya fueron importadas anteriormente");
                return false; // No volvemos a importar
            }

            // Petición GET (fetch devuelve una promesa)
            // Limit=5 para no sobrecargar la API
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');

            // Validación: ¿El servidor respondió bien?
            if (!respuesta.ok) throw new Error("No se pudo conectar con el servidor de tareas");

            // Convertimos la respuesta a JSON
            const usuarios = await respuesta.json();

            // Array de plantillas de tareas variadas
            const plantillasTareas = [
                {
                    titulo: (nombre) => `📞 Llamar a ${nombre}`,
                    descripcion: (user) => `Teléfono: ${user.phone} | Ciudad: ${user.address.city}`
                },
                {
                    titulo: (nombre) => `🏥 Cita al médico con ${nombre}`,
                    descripcion: (user) => `Dirección: ${user.address.street} | Email: ${user.email}`
                },
                {
                    titulo: (nombre) => `🎾 ${nombre} jugará conmigo tenis`,
                    descripcion: (user) => `Empresa: ${user.company.name} | Ciudad: ${user.address.city}`
                },
                {
                    titulo: (nombre) => `☕ Reunión de café con ${nombre}`,
                    descripcion: (user) => `Website: ${user.website} | User: ${user.username}`
                },
                {
                    titulo: (nombre) => `� Enviar email a ${nombre}`,
                    descripcion: (user) => `Email: ${user.email} | Empresa: ${user.company.name}`
                }
            ];

            // Procesamos cada usuario con una plantilla diferente
            usuarios.forEach((usuario, index) => {
                // Usamos el índice para asignar una plantilla diferente a cada usuario
                const plantilla = plantillasTareas[index % plantillasTareas.length];

                // Generar fecha de vencimiento aleatoria (entre 1 y 10 días en el futuro)
                const diasAleatorios = Math.floor(Math.random() * 10) + 1;
                const fechaVencimiento = new Date();
                fechaVencimiento.setDate(fechaVencimiento.getDate() + diasAleatorios);
                const fechaVencimientoStr = fechaVencimiento.toISOString().split('T')[0]; // Formato YYYY-MM-DD

                const nuevaTarea = new Tarea(
                    plantilla.titulo(usuario.name),
                    plantilla.descripcion(usuario),
                    usuario.id,
                    fechaVencimientoStr // Agregamos fecha de vencimiento
                );

                this.tareas.push(nuevaTarea);
            });

            this.guardar(); // Guardamos cambios

            // Marcamos que ya se importaron las tareas externas
            localStorage.setItem("tareasExternasImportadas", "true");
            console.log("✅ Tareas externas importadas por primera vez");

            return true;

        } catch (error) {
            console.error(error);
            throw error; // Re-lanzamos el error que main.js lo capture
        }
    }

}