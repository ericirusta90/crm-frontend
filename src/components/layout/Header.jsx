import { CRMContext } from "../../context/CRMContext"
import { useContext } from "react"
import { useNavigate } from 'react-router-dom'


const Header = () => {

  const [auth, setAuth] = useContext(CRMContext)

  const navigate = useNavigate() 

  const cerrarSesion = () => {
    setAuth({
      token : '',
      auth: false
    })

    localStorage.setItem('token', '')

    navigate('/iniciar-sesion')
  }

  return (
    <header className="barra">
        <div className="contenedor">
            <div className="contenido-barra">
              <h1>CRM - Administrador de Clientes</h1>

              { auth.auth ? (
                <button 
                  type="button"
                  className="btn btn-rojo"
                  onClick={cerrarSesion}
                >
                  <i className="far fa-times-circle"></i>
                  Cerrar Sesión
                </button>
              ) : null }

              
            </div>
            
        </div>
    </header>
  )
}

export default Header