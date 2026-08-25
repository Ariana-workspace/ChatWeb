import axios from "axios";

const URL = "http://localhost:8080";

export async function login(email, password) {

    const response = await axios.post(`${URL}/chat/auth/login`, {
        email,
        password
    });

    return response.data;
}