import { useEffect,useState } from 'react'
import { obtenerGrupoPorIdUsuario } from '../services/usuarioGruposService';
import { obtenerGrupoPorId } from '../services/grupoService';

const Nav = () => {
  const [grupos, setGrupos] =useState([]);
  const id_usuario = localStorage.getItem("id_usuario")
  const [grupo, setGrupo] = useState([])
  const [id_grupo, setIdGrupo] = useState(0)
  
  const obtenerGrupoClickeado=(g, id)=>{
    setIdGrupo(id)
    setGrupo(g)
  }
  localStorage.setItem("id_grupo", id_grupo);
  localStorage.setItem("grupo", JSON.stringify(grupo));



  useEffect(() => {
  const cargarGrupos = async () => {
    const data = await obtenerGrupoPorIdUsuario(id_usuario);
    const gruposCompletos = await Promise.all(
      data.map(async (ug) => {
        const grupo = await obtenerGrupoPorId(ug.id_grupo);
        return grupo;
      })
    );

    setGrupos(gruposCompletos);
  }
  cargarGrupos()
}, [])

    return (
    <div className='navegador-chats'>
      
      <div className="chat-uwu">
        <h1 className='m-3 text-light'>Tus chatsitos</h1>
        <ul>
      {grupos.map(
        (grupo) => (
              <li key={grupo.id_grupo} value={grupo.id_grupo}>
                <button onClick={() => {
                  obtenerGrupoClickeado(grupo, grupo.id_grupo)
                }} className='btn bg-jared text-light'>{grupo.nombre}</button>
                </li>
        )
      )}
      </ul>
      </div>
    </div>
  )
}

export default Nav
