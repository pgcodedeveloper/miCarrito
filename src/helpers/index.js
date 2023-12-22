export function formatearFecha (fecha){
    const f = new Date(fecha);
    f.setDate(f.getDate()+1);
    const op = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    return f.toLocaleDateString("es-ES",op);
}