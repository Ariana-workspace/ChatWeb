import {useState, useEffect
} from 'react'
import { usuarioPorId } from '../../../services/usuarioService';
import { enviarSolicitud, obtenerSolicitudesEnviadas } from '../../../services/solicitudesAmistad';


const Add = () => {
  const [amigos, setAmigos] = useState([])
  const [usuariosABuscar, setUsuariosABuscar] = useState([])
  const id_usuario =localStorage.getItem("id_usuario");
  const [q, setQ] = useState("");

  const handleBuscar = async (e) => {
    const texto = e.target.value;
    setQ(texto);
    if(!texto.trim()){
      setUsuariosABuscar([])
      return;
    }
    const usuario = await usuarioPorId(texto);
    setUsuariosABuscar(usuario ? [usuario] : []);
  }
  const add = async (id_amigo, estado ) =>{
    const amigo = await enviarSolicitud(id_usuario, id_amigo, estado);
    console.log(id_usuario, id_amigo, estado)
    return amigo;
  }

  useEffect(() =>{
        const cargarAmigos= async () =>{
          const data = await obtenerSolicitudesEnviadas(id_usuario);
          const amigosCompletos = await Promise.all(
            data.map(async (ug)=>{
              const amigo = await usuarioPorId(ug.id_amigo);
              return amigo;
            })
          )
          setAmigos(amigosCompletos);
          console.log(amigos)
        }
        cargarAmigos()
  },[id_usuario]);


  return (
    <div className="contenedor-amigos">
      <input className='txt-write' type="text" placeholder='Buscar'
        value={q} onChange={handleBuscar}
      />
      
      <ul className='lista-amigos'>
        {Array.isArray(usuariosABuscar) && usuariosABuscar.map((user)=>
        (
        <li className='text-white'>
        {user.nombre}
         
        <button className="btn-sumar" onClick={()=>{add(user.id_usuario, "PENDIENTE")}}>
        
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3V13M3 8H13" stroke="#4DEA89" stroke-width="2" stroke-linecap="round"/>
        </svg>


        </button>
        <button className="btn-quitar" title="Quitar solicitud"></button>
        
        </li>
      )
      )}
        {amigos.map((amigo)=>
        (
        <li className='text-white'>
        {amigo.nombre}
         
        <button className="btn-quitar" title="Quitar solicitud"></button>
        
        </li>
      )
      )}
      </ul>
    </div>
  )
}

export default Add
