import React, { useEffect,useState } from 'react'
import { obtenerGrupoPorIdUsuario } from '../services/usuarioGruposService';
import { obtenerGrupoPorId } from '../services/grupoService';

const Nav = () => {
  const [grupos, setGrupos] =useState([]);
  const id_usuario = localStorage.getItem("id_usuario")

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
      {grupos.map(
        (grupo) => (
          
            <ul key={grupo.id_grupo}>
              <li><button className='btn text-light'>{grupo.nombre}</button></li>
            </ul>
          
        )
      )}
      </div>
    </div>
  )
}

export default Nav
