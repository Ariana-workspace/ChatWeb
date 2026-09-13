import axios from "axios";
const URL = "http://localhost:8080";

export async function crearChatDirecto(id_usuario, id_amigo) {
    const token = localStorage.getItem("token")
    const response = await axios.post(
    `${URL}/chatdirecto/crearchat`,
    { id_usuario, id_amigo}, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
    return response.data;
    
}

export async function obtenerChatUnico(id_usuario, id_amigo) {
    const token = localStorage.getItem("token")
    const response = await axios.get(
        `${URL}/chatdirecto/buscarchat/${id_usuario}/${id_amigo}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export async function eliminarchat(id_chat_directo) {
    const token = localStorage.getItem("token")
    const response = await axios.get(
        `${URL}/chatdirecto/eliminar/${id_chat_directo}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}