import {useState} from 'react'
import { register } from '../../services/usuarioService';
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css"
const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registrar = async (e) => {
    e.preventDefault();
    try{
      const usuario = await register(nombre,email, password);
      console.log("Usuario registrado:", usuario);
      navigate("/"); 
    }catch(error){
        console.error("Error al registrar", error);
    }
  }
  
  return (
    <div className="container-login d-flex  justify-content-center ">
      <div className='w-20 h-70 d-flex  justify-content-center m-auto row-cols-1'>
      <div className=' col'>
        <h1 className='text-center '>Registar</h1>
        <form onSubmit={registrar} className='d-flex flex-column '>
            <input 
            type="text"
            placeholder="Nombre"
            className="form-control my-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
            <input 
            type="text"
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
          <button type="submit" className='text-jared bg-body btn mt-3 fz-20'>Enviar a la basesita de datos :3!</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register
