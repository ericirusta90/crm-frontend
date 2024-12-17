import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Producto = ({producto}) => {

  const {_id, nombre, precio, imagen } = producto  

  const eliminarProducto = (idProducto) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Un producto eliminado no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          //llamada a axios
          
            clienteAxios.delete(`/productos/${idProducto}`)
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
                    text: "Hubo un error al intentar eliminar el producto.", 
                    icon: "error"
                }); 
            });
          
        }
      });



  }

  return (
      <li className="producto">
          <div className="info-producto">
              <p className="nombre">{nombre}</p>
              <p className="precio">${precio}</p>
              { imagen ? (
                <img src={`${import.meta.env.VITE_BACKEND_URL}/${imagen}`} alt='imagen-producto' />
              ) : null }
          </div>
          <div className="acciones">
              <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                  <i className="fas fa-pen-alt"></i>
                  Editar Producto
              </Link>

              <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={ () => eliminarProducto(_id) }
              >
                  <i className="fas fa-times"></i>
                  Eliminar Producto
              </button>
          </div>
      </li>
  )
}

export default Producto