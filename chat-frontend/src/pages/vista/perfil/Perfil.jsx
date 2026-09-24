import { useEffect, useState } from 'react'
import { usuarioPorId } from '../../../services/usuarioService';
import '../styles/Perfil.css'

const Perfil = () => {
  const [user, setUser] = useState({})
  const id_usuario =localStorage.getItem("id_usuario");
  useEffect(() =>{
    const cargarUsuarioUwu= async () =>{
      const data = await usuarioPorId(id_usuario);
      setUser(data)
      console.log(data)
      return data;
      
    }
    cargarUsuarioUwu()
  },[id_usuario]);
  return (
    <div className='perfil'>
      <img className="photo-user" src={user.foto}/> 
      <h3 className='text-white usuarioNombre'>{user.nombre}</h3>
      <h5 className='text-white usuarioDescripcion'>{user.descripcion}</h5>
      
      <h5 className='text-white usuarioDescripcion'>{user.fecha_union}</h5>

      <h6 className='text-white usuarioDescripcion'>{user.genero}</h6>
    </div>
  )
}

export default Perfil
