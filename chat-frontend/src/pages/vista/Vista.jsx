import "../../styles/Vista.css"

import Config from "./Config"
import Perfil from "./Perfil"
import Amigos from "./Amigos"
const Vista = () => {
  return (
    <>
    <div className='contenedor-de-navegacion'>
      <ul className='header-nav'>
              <li><button className="btn black-btn text-white">perfil</button></li> 
              <li><button className="btn black-btn text-white">amigos</button></li> 
              <li><button className="btn black-btn text-white">config</button></li>
            </ul>
        <div className='navegacion'>
            
            {/* <Perfil/> */}
            <Amigos/>
            <Config/>
        </div>
    </div>
    

    </>
  )
}

export default Vista
