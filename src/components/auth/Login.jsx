import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import clienteAxios from "../../config/axios"
import { CRMContext } from "../../context/CRMContext"

const Login = () => {

  const [credenciales, setCredenciales] = useState({})
  
  const [auth, setAuth] = useContext(CRMContext)

  const navigate = useNavigate() // Hook para navegación

  const iniciarSesion = async (e) => {
    e.preventDefault()

    //autenticacion del usuario
    try {
        const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales)
        // extraccion del token 
        const { token } = respuesta.data
        localStorage.setItem('token', token)

        //colocarlo en el state
        setAuth({
            token,
            auth: true
        })

        navigate('/'); // Redireccionar a la página de clientes
        
    } catch (error) {
        if (error.response) {
            Swal.fire({
                title: "Hubo un error", 
                text: error.response.data.msg, 
                icon: "error"
            })
        } else {
            Swal.fire({
                title: "Hubo un error", 
                text: 'Hubo un error', 
                icon: "error"
            })
        }
       
    }

  }  

  const leerDatos = (e) => {
    setCredenciales({
        ...credenciales,
        [e.target.name] : e.target.value    
    })
  }

  return (
    <div className='login'>
        <h2>Iniciar Sesión</h2>

        <div className='contenedor-formulario'>
            <form
                onSubmit={iniciarSesion}
            >

                <div className='campo'>
                    <label>Email:</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Email para iniciar sesión"
                        required
                        onChange={leerDatos}     
                    />
                </div>

                <div className='campo'>
                    <label>Password:</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password para iniciar sesión"
                        required
                        onChange={leerDatos}     
                    />
                </div>

                <input type="submit" className='btn btn-verde btn-block' value="Iniciar Sesión" />

            </form>

        </div>

    </div>
  )
}

export default Login