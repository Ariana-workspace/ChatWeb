import { login } from '../../services/usuarioService';
import "../../styles/Login.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const iniciarSesion = async (e) => {
    e.preventDefault();
    try{
      const usuario = await login(email, password);
      console.log("Usuario logueado:", usuario);
      localStorage.setItem("token", usuario.token);
      localStorage.setItem("id_usuario",usuario.id_usuario)
      localStorage.setItem("email", usuario.email)
      navigate("/home"); 
    }catch(error){
        console.error("Error al iniciar sesión:", error);
    }
  }
  return (
    <div className="container-login d-flex  justify-content-center ">
      <div className='w-20 h-70 d-flex  justify-content-center m-auto row-cols-1'>
      <div className=' col'>
        <h1 className='text-center '>Login</h1>
        <form onSubmit={iniciarSesion} className='d-flex flex-column '>
          <input 
          ttype="text"
    placeholder="Email"
    className="form-control my-3"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" placeholder='Contraseña' 
          className='form-control mb-3'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='btn bg-jared text-white fw-semibold fz-20'>Iniciar Sesión</button>
          <button className='text-jared bg-body btn mt-3 fz-20'>Registrarse</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login
