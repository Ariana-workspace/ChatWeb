import {useState, useEffect} from 'react'
import { obtenerSolicitudesRecibidas} from '../../../services/solicitudesAmistad';
import { usuarioPorId } from '../../../services/usuarioService';
import { crearChatDirecto } from '../../../services/chatDirectoService';

const MyFriends = () => {
  const [cargando, setCargando] = useState(true);
  const [amistades, setAmistades] = useState([])
  const id_usuario =localStorage.getItem("id_usuario");

  useEffect(() =>{
        async function cargarAmigos(){
          try{
            const solicitudes = await obtenerSolicitudesRecibidas(id_usuario);
            const amigos = solicitudes.filter(
                solicitud => solicitud.estado === "aceptada"
            )
            console.log(amigos)
            const datosUsuarios = await Promise.all(
              amigos.map(async (ug)=>{
                const amigo = await usuarioPorId(ug.id_usuario);
                return amigo;
              })
            )
            setAmistades(datosUsuarios)
          }catch(error){
            console.error("Error al cargar amigos: ", error);
          }finally {
        setCargando(false);
      }
        }
        async function cargarChat(id_usuario, id_amigo){
          try{
            const crearChat = await crearChatDirecto(id_usuario, id_amigo)
          }catch(error){
            console.log("Error: ", error);
          }
        }
        cargarAmigos()
      },[id_usuario]);

      if (cargando) {
    return (
      <div className='contenedor-añadir'>
      <input className='txt-write' type="text" placeholder='Buscar'/>

      <div className="loading">
        <div className="loading-card loading-estado">
          <div className="loading-spinner"></div>
          <p>Cargando amistades...</p>
        </div>
      </div>
      </div>
 
        
 
    );
  }
  return (
    <div className='contenedor-añadir'>
      <input className='txt-write' type="text" placeholder='Buscar'/>
      <ul className='lista-amigos'>
         {amistades.map((amistad)=>
        (
        <li className='text-white'>
        {amistad.nombre}
        
        <button className="abrir-chat" onClick={()=>{cargarChat(id_usuario ,amistad.id_usuario)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(104, 92, 217)" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="lucide lucide-messages-square preview-icon">
          <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/>
          </svg>
          
        </button>
        </li>
      )
      )}
      </ul>
    </div>
  )
}

export default MyFriends
