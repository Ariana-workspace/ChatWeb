import axios from "axios";

const URL = "http://localhost:8080";

export async function historialMensajes(){
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/mensajes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}

export async function historialDeMensajePorGrupo(id_grupo){
  const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/mensajes/grupo/${id_grupo}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}