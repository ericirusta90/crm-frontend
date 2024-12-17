import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import clienteAxios from "../../config/axios"
import FormBuscarProducto from "./FormBuscarProducto"
import FormCantidadProducto from "./FormCantidadProducto"
import Swal from "sweetalert2"

const NuevoPedido = () => {

  const { id } = useParams()
  
  const [cliente, setCliente] = useState({})
  const [busqueda, setBusqueda] = useState('')
  const [productos, setProductos] = useState([])
  const [total, setTotal] = useState(0)

  const navigate = useNavigate() // Hook para navegación

  useEffect( () => {
    //obtener el cliente
    const consultarApi = async () => {
      const resultado = await clienteAxios.get(`/clientes/${id}`)
      setCliente(resultado.data)
    }
    
    consultarApi()

    //actualizar el total a pagar
    actualizarTotal()

  }, [productos] )

  const buscarProducto = async (e) => {
    e.preventDefault()
    //obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
    //console.log(resultadoBusqueda.data);

    //si hay resultados en la busqueda
    if (resultadoBusqueda.data[0]) {

      let productoResultado = resultadoBusqueda.data[0]
      //agregar la llave 'producto' (copia de id)
      productoResultado.producto = resultadoBusqueda.data[0]._id
      productoResultado.cantidad = 0

      //ponerlo en el state
      setProductos([...productos, productoResultado])
      
    } else {
      // no hay resultados
      Swal.fire({
        title: "Sin Resultados", 
        text: "No se encontraron productos con ese nombre", 
        icon: "error"
    }); 
    }
  }

  //almacena una busqueda en el state
  const leerDatosBusqueda = (e) => {
    setBusqueda(e.target.value)
  }


  //actualizar la cantidad de productos
  const restarProductos = (i) => {
    //copia arreglo original de productos
    const todosProductos = [...productos]

    //validar si es 0 no puede ir mas alla
    if (todosProductos[i].cantidad === 0) return

    //decremento
    todosProductos[i].cantidad--

    //almacenar en state
    setProductos(todosProductos)
  }

  const aumentarProductos = (i) => {
    //copia arreglo original de productos
    const todosProductos = [...productos]

    //incremento
    todosProductos[i].cantidad++

    //almacenar en state
    setProductos(todosProductos)
  }


  // elimina un producto del state
  const eliminarProductoPedido = (id) => {
    const todosProductos = productos.filter( producto => producto.producto !== id)

    setProductos(todosProductos)
  }


  //actualizar el total a pagar
  const actualizarTotal = () => {
    //si el arreglo de productos es igual 0 : el total es 0
    if (productos.length ===0) {
      setTotal(0)
      return
    }

    //calcular nuevo total
    let nuevoTotal = 0

    //recorrer todos los productos y sus cantidades y precios
    productos.map( producto => nuevoTotal += (producto.cantidad * producto.precio) )

    //almacenar el total
    setTotal(nuevoTotal)
  }


  // almacena el pedido el la BD
  const realizarPedido = async (e) => {
    e.preventDefault()

    //construccion del objeto
    const pedido = {
      "cliente" : id,
      "pedido" :  productos,
      "total" : total
    }

    //almacenarlo en bd
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido)

    //leer resultado
    if (resultado.status === 201) {
      Swal.fire({
        title: "Pedido realizado", 
        text: resultado.data.msg, 
        icon: "success"
      })

      navigate('/pedidos'); // Redireccionar a la página de pedidos

    } else {
      Swal.fire({
        title: "Hubo un error", 
        text: "No se puso realizar el pedido. Vuelve a intentarlo", 
        icon: "error"
      })
    }
  }

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
          <h3>Datos de Cliente</h3>
          <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
          <p>Tel: {cliente.telefono}</p>
      </div>

      <FormBuscarProducto 
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />
      

          <ul className="resumen">
              
             { productos.map( (producto, index) => (
                <FormCantidadProducto 
                  key={producto.producto}
                  producto={producto}
                  restarProductos={restarProductos}
                  aumentarProductos={aumentarProductos}
                  eliminarProductoPedido={eliminarProductoPedido}
                  index={index}
                />
             ))}

          </ul>
          
          <p className="total">Total a pagar: <span>${total}</span></p>

          { total > 0 ? (
            <form
              onSubmit={realizarPedido}
            >
              <input 
                type="submit"
                className="btn btn-verde btn-block"
                value="Realizar pedido"
              />
          
            </form>
          ) : null }
          
      
    </>
  )
}

export default NuevoPedido