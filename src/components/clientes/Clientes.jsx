import clienteAxios from "../../config/axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import Cliente from "./Cliente"
import Spinner from "../layout/Spinner"
import { CRMContext } from "../../context/CRMContext"

const Clientes = () => {

  const [clientes, setClientes] = useState([]) 

  const navigate = useNavigate() // Hook para navegación
  
  // Utiliza valores del context
  const [auth, setAuth] = useContext(CRMContext)


  useEffect( () => {

    if (auth.token !== '') {
      
    //query a la API
    const consultarApi = async () => {
      
      try {
        const clientesConsulta = await clienteAxios.get('/clientes', {
          headers: {
            Authorization : `Bearer ${auth.token}`
          }
        })

        setClientes(clientesConsulta.data)

      } catch (error) {
        //error con la autorizacion
        if (error.response.status = 500) {
          navigate('/iniciar-sesion')
        }
      }
    
    }

    consultarApi()
  } else {
    navigate('/iniciar-sesion'); // Redireccionar al login
  }
  }, [clientes] )


  //si el state esta como false
  if (!auth.auth) {
    navigate('/iniciar-sesion'); // Redireccionar al login
  }

  //spinner de carga
  if (!clientes.length) {
    return <Spinner />
  }

  return (
    <>
      <h2>Clientes</h2>

      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map( cliente => (
          <Cliente
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>

    </>
  )
}

export default Clientes