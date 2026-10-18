import { useEffect,useState } from 'react'
import { obtenerGrupoPorIdUsuario } from '../services/usuarioGruposService';
import { obtenerGrupoPorId } from '../services/grupoService';
import './Nav.css'
const Nav = ({onSeleccionarGrupo}) => {
  const [cargando, setCargando] = useState(true);
  const [grupos, setGrupos] =useState([]);
  const id_usuario = localStorage.getItem("id_usuario")
  
  useEffect(() => {
  async function cargarGrupos () {
    try{
      const data = await obtenerGrupoPorIdUsuario(id_usuario);
    const gruposCompletos = await Promise.all(
      data.map(async (ug) => {
        const grupo = await obtenerGrupoPorId(ug.id_grupo);
        return grupo;
      })
    );

    setGrupos(gruposCompletos);
    }catch(error){
      console.log("Error: ", error)
    }finally{
      setCargando(false)
    }
  }
  cargarGrupos()
}, [])
if (cargando) {
    return (
      <div className='navegador-chats'>
      <div className="chat-uwu">
        <h1 className='m-3 text-light'>Tus chatsitos</h1>

      <div className="loading">
        <div className="loading-card loading-estado">
          <div className="loading-spinner"></div>
          <p>Cargando grupos...</p>
        </div>
      </div>
      </div>
      </div>

    );
  }

    return (
    <div className='navegador-chats'>
      
      <div className="chat-uwu">
        <h1 className='m-3 text-light'>Tus chatsitos</h1>
        <ul>
      {grupos.map(
        (grupo) => (
              <li className="mt-3" key={grupo.id_grupo} value={grupo.id_grupo}>
                <button onClick={() => onSeleccionarGrupo(grupo, grupo.id_grupo)} className='btn bg-jared fw-bold text-black'>{grupo.nombre}</button>
                </li>
        )
      )}
      </ul>
      </div>
    </div>
  )
}

export default Nav
