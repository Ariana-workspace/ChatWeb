export const Mensaje = (id_mensaje, id_grupo, id_usuario, contenido,fecha) => ({
    id_mensaje, 
    id_grupo, 
    id_usuario, 
    contenido, 
    fecha: new Date()
})
