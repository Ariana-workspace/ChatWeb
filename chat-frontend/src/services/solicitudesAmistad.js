import axios from "axios"
const URL = "http://localhost:8080"

export async function obtenerSolicitudesEnviadas(id_usuario){
    const token = localStorage.getItem("token")
    const response = await axios.get(`${URL}/amigos/enviadas/${id_usuario}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}
export async function obtenerSolicitudesEnviadas(id_amigo){
    const token = localStorage.getItem("token")
    const response = await axios.get(`${URL}/amigos/recibidas/${id_amigo}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}
export async function enviarSolicitud(id_usuario, id_amigo, estado ){
    const token = localStorage.getItem("token")
    const response = await axios.post(
    `${URL}/amigos/enviarsoli`,
    { id_usuario, id_amigo, estado }, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
    return response.data;
}

export async function quitarSolicitud(id ){
    const token = localStorage.getItem("token")
    const response = await axios.post(
    `${URL}/amigos/quitarsoli/${id}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
    return response.data;
}