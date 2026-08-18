import axios from "axios";
const URL = "http://localhost:8080";


export default function obtenerGrupos(){
    const response = await axios.get(`${URL}/grupos`);
    return response.data;
}

export async function obtenerGrupoPorId(id_grupo) {
    const response = await axios.get(`${URL}/grupos/${id_grupo}`);
    return response.data;
}