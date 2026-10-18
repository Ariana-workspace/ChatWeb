import {useState, useEffect
} from 'react'
import { usuarioPorId } from '../../../services/usuarioService';
import { obtenerSolicitudesRecibidas, responderSolicitud } from '../../../services/solicitudesAmistad';


const Solicitudes = () => {
  const [cargando, setCargando] = useState(true);
  const [q, setQ] = useState("");
  const [solicitudes, setSolicitudes] = useState([])
  const id_usuario =localStorage.getItem("id_usuario");
  const [btnAccept, setBtnAccept] = useState(true);
    
    const responderSoli =async (id_usuario, id_amigo, respuesta) =>{
      setBtnAccept(false)
      const datosSolicitud = await responderSolicitud(id_usuario, id_amigo, respuesta);
      return;
    }
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
    useEffect(() =>{
      async function cargarAmigos(){
        try{
          const datos = await obtenerSolicitudesRecibidas(id_usuario);
          const solicitudesPendientes = datos.filter(
            solicitud => solicitud.estado === "pendiente"
          )
          const datosDePendientes = await Promise.all(
            solicitudesPendientes.map(async (ug) => {
                const soli = await usuarioPorId(ug.id_usuario)
                return soli;
              })
          )
        setSolicitudes(datosDePendientes);
        }catch(error){
          console.log("Error al cargar pendientes: ", error);
        }finally {
        setCargando(false);
      }
      }
      cargarAmigos()
    },[id_usuario]);

    if (cargando) {
    return (
 
        <div className='contenedor-amigos'>
      <input className='txt-write' type="text" placeholder='Buscar'/>

      <div className="loading">
        <div className="loading-card loading-estado">
          <div className="loading-spinner"></div>
          <p>Cargando solicitudes...</p>
        </div>
      </div>
      </div>
 
    );
  }
  return (
    <div className="contenedor-amigos">
      <input className='txt-write' type="text" placeholder='Buscar'
       value={q} onChange={handleBuscar}/>
      
      <ul className='lista-amigos'>
        {solicitudes.map((solicitud)=>
        (
        <li className='text-white'>
        {solicitud.nombre}
        {btnAccept && 
        <button className="btn-sumar" onClick={()=>{responderSoli(id_usuario ,solicitud.id_usuario, "aceptada")}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10L4 8L3 9L6 12L13 5L12 4L6 10Z" fill="#4dea89"/>
        </svg>
        </button>
        }
        <button className="btn-quitar" onClick={()=>{responderSoli(id_usuario ,solicitud.id_usuario, "rechazada")}}></button>
        </li>
      )
      )}
      </ul>
    </div>
  )
}

export default Solicitudes
