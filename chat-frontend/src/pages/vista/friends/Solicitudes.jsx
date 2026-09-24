import {useState, useEffect
} from 'react'
import { usuarioPorId } from '../../../services/usuarioService';


const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [amigos, setAmigos] = useState([])
    const id_usuario =localStorage.getItem("id_usuario");
    useEffect(() =>{
      const cargarUsuarioUwu= async () =>{
        const data = await obtenerSolicitudesEnviadas(id_usuario);
        setSolicitudes(data)
        console.log(data)
        return data;
        
      }
      const cargarAmigos= async () =>{
        const data = await usuarioPorId(id_usuario);
        setAmigos(data)
        console.log(data)
        return data;
      }
      
      cargarUsuarioUwu()
    },[id_usuario]);
  return (
    <div>
      <input className='txt-write' type="text" placeholder='Buscar'/>
      
      <ul className='lista-amigos'>
        {solicitudes.map((m,i)=>
        (
        <li>{m.id_amigo}</li>
      )
      )}
      </ul>
    </div>
  )
}

export default Solicitudes
