export function formatearFecha (fecha){
    const f = new Date(fecha);

    const op = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    return f.toLocaleDateString("es-ES",op);
}