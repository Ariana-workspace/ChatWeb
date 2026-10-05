import {useState, useEffect
} from 'react'
import { usuarioPorId } from '../../../services/usuarioService';
import { obtenerSolicitudesRecibidas } from '../../../services/solicitudesAmistad';


const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([])
    const id_usuario =localStorage.getItem("id_usuario");

    const aceptarSoli =(id_usuario) =>{
      
    }
    useEffect(() =>{
      const cargarAmigos= async () =>{
        const data = await obtenerSolicitudesRecibidas(id_usuario);
        const solicitudesCompletas = await Promise.all(
          data.map(async (ug)=>{
            const amigo = await usuarioPorId(ug.id_usuario);
            return amigo;
          })
        )
        setSolicitudes(solicitudesCompletas);
        console.log(solicitudes)
      }
      cargarAmigos()
    },[id_usuario]);
  return (
    <div className="contenedor-amigos">
      <input className='txt-write' type="text" placeholder='Buscar'/>
      
      <ul className='lista-amigos'>
        {solicitudes.map((solicitud)=>
        (
        <li className='text-white'>
        {solicitud.nombre}
        <button className="btn-sumar" onClick={()=>{aceptarSoli(solicitud.id_usuario)}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10L4 8L3 9L6 12L13 5L12 4L6 10Z" fill="#4dea89"/>
        </svg>
        </button>
        <button className="btn-quitar" value="rechazar"></button>
        </li>
      )
      )}
      </ul>
    </div>
  )
}

export default Solicitudes
