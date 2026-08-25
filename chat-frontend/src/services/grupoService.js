import axios from "axios";
const URL = "http://localhost:8080";

export async function obtenerGrupos(){
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/grupos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    return response.data;
}

export async function obtenerGrupoPorId(id_grupo) {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/grupos/${id_grupo}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });;
    return response.data;
}