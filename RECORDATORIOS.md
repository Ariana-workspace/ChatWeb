actualmente en la zona de solicitudes(dentro de amigos) aún salen las solicitudes que fueron aceptadas,
tenemos que filtrar que solo las solicitudes en estado "pendiente" aparezcan y no las que fueron rechazadas/aceptadas.

Tmb estamos avanzando lo que el chat_directo, o sea, una conversación de dos personas.
Se está añadiendo una columna nueva "id_chat_directo" en la tabla de mensajes, servirá para que el mensaje pueda ser parte de un chat_directo, el id_grupo/id_chat_directo en la tabla mensaje están en Null.