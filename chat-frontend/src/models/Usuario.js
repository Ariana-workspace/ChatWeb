export const usuario =(id_usuario, nombre,email, password,fecha_union, genero, descripcion) =>({
    id_usuario,
    nombre,
    email,
    password,
    fecha_union: new Date(),
    genero, 
    descripcion
})
