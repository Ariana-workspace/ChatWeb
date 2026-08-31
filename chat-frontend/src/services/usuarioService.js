import axios from "axios";

const URL = "http://localhost:8080";

export async function login(email, password) {

    const response = await axios.post(`${URL}/chat/auth/login`, {
        email,
        password
    });

    return response.data;
}
export async function usuarioPorId(id_usuario){
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/usuario/${id_usuario}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    })
    return response.data;
}

export async function register(nombre, email, password){
    const response = await axios.post(`${URL}/chat/auth/register`,{
        nombre,
        email,
        password
    });
    return response.data;

}