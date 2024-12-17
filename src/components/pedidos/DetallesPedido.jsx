import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const DetallesPedido = ({pedido}) => {

  const { cliente } = pedido || {}
  
  const eliminarPedido = (id) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Un pedido eliminado no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          //llamada a axios
          
            clienteAxios.delete(`/pedidos/${id}`)
            .then(response => {
                Swal.fire({
                    title: "Eliminado!",
                    text: response.data.msg,
                    icon: "success"
                  });    
            })
            .catch(error => { 
                console.error(error); 
                Swal.fire({
                    title: "Error!", 
                    text: "Hubo un error al intentar eliminar el pedido.", 
                    icon: "error"
                }); 
            });
          
        }
      });
  }



  return (
    <>

            <li className="pedido">
              <div className="info-pedido">
                  <p className="id">ID: {pedido._id}</p>
                  <p className="nombre">Cliente: {cliente?.nombre} {cliente?.apellido}</p>

                  <div className="articulos-pedido">
                      <p className="productos">Artículos Pedidos: </p>

                      <ul>
                          { pedido.pedido.map( articulos =>(
                            <li key={pedido._id+articulos.producto._id} >
                                <p>{articulos.producto.nombre}</p>
                                <p>Precio: ${articulos.producto.precio}</p>
                                <p>Cantidad:{articulos.cantidad}</p>
                            </li>
                          )) }
                      </ul>

                  </div>
                  <p className="total">Total: ${pedido.total} </p>
              </div>
              <div className="acciones">
                  

                  <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={ () => eliminarPedido(pedido._id) }
                    >
                      <i className="fas fa-times"></i>
                      Eliminar Pedido
                  </button>
              </div>
            </li>
    
    </>
  )
}

export default DetallesPedido