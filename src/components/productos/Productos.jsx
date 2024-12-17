import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import clienteAxios from "../../config/axios"
import Producto from './Producto'
import Spinner from '../layout/Spinner'
import { CRMContext } from "../../context/CRMContext"
import { useNavigate } from 'react-router-dom'


const Productos = () => {

  const [productos, setProductos] = useState([])

   // Utiliza valores del context
   const [auth, setAuth] = useContext(CRMContext)

   const navigate = useNavigate() // Hook para navegación

  // useEffect para consultar la api cuando cargue
  useEffect( () => {

    if (auth.token !== '') {

      //query a a la api
      const consultarApi = async () => {
        try {
          const productosConsulta = await clienteAxios.get("/productos", {
            headers: {
              Authorization : `Bearer ${auth.token}`
            }
          })
          
          setProductos(productosConsulta.data)
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
  }, [productos] )

  //si el state esta como false
  if (!auth.auth) {
    navigate('/iniciar-sesion'); // Redireccionar al login
  }

  //spinner de carga
  if (!productos.length) {
    return <Spinner />
  }

  return (
    <>
      <h2>Productos</h2>

      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">

        { productos.map( producto => (
          <Producto 
            key={producto._id}
            producto={producto}
          />
        ))}
    
      </ul>

    </>

  )
}

export default Productos