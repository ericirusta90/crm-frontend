import { useEffect, useState, useContext } from "react"
import clienteAxios from "../../config/axios"
import DetallesPedido from "./DetallesPedido"
import { useNavigate } from 'react-router-dom'
import { CRMContext } from "../../context/CRMContext"


const Pedidos = () => {

  const [pedidos, setPedidos] = useState([])

  // Utiliza valores del context
  const [auth, setAuth] = useContext(CRMContext)

  const navigate = useNavigate() // Hook para navegación

  useEffect( () => {

    if (auth.token !== '') {

      //obtener los pedidos
      const consultarApi = async () => {
        try {
          const resultado = await clienteAxios.get(`/pedidos`, {
            headers: {
              Authorization : `Bearer ${auth.token}`
            }
          })
          //console.log(resultado.data);
          setPedidos(resultado.data)
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
  }, [pedidos] )

  return (
    <>
    
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
          {pedidos.map( pedido => (
            <DetallesPedido 
              key={pedido._id}
              pedido={pedido}
            />
          ))}
          
      </ul>

    </>
  )
}

export default Pedidos