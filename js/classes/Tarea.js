
// TAREA

export class Tarea {
    #id;

    constructor(titulo, descripcion, id = Date.now(), fechaVencimiento = null) {
        //1. Identificador único automático
        this.#id = id;

        // Título y Descripción
        this.titulo = titulo;
        this.descripcion = descripcion;

        // 2. Estado inicial por defecto
        this.estado = 'pendiente';

        // 3. Fecha de creación
        this.fechaCreacion = new Date();

        // 4. Fecha de vencimiento (opcional)
        this.fechaVencimiento = fechaVencimiento;
    }

    // Getter para poder leer el ID pero no modificarlo directamente
    get id() { return this.#id; }
    //Método solicitado para cambiar el estado de la tarea
    cambiarEstado() {
        this.estado = this.estado === 'pendiente' ? 'completada' : 'pendiente'
    }
}