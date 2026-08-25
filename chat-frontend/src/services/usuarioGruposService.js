import axios from "axios";
const URL = "http://localhost:8080";

export async function obtenerGrupoPorIdUsuario(id_usuario){
    const token = localStorage.getItem("token")
    const response = await axios.get(`${URL}/grupos/usuario/${id_usuario}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}

