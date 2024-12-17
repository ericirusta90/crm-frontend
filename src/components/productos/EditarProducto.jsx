import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import clienteAxios from "../../config/axios"
import Spinner from '../layout/Spinner'

const EditarProducto = () => {

  //obtener Id
  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  })

  const [archivo, setArchivo] = useState('')

  useEffect( () => {

    //query a la API
    const consultarApi = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`)

    setProducto(productoConsulta.data)
  }

    consultarApi()
  }, [] )


  //edita un producto en la BD
  const handleSubmit = async e => {
    e.preventDefault()

    //formdata
    const formData = new FormData()
    formData.append('nombre', producto.nombre)
    formData.append('precio', producto.precio)
    formData.append('imagen', archivo)

    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      
      if (res.status===200) {
        Swal.fire({
          title: "Se Editó el Producto",
          text: res.data.msg,
          icon: "success"
        });
      }

      console.log(res);

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un Error",
        text: 'Vuelve a intentarlo' 
      });
    }

  }



  //leer datos del form
  const leerInfoProducto = (e) => {
    setProducto({
      //obtener una copia del state y agregar el nuevo
      ...producto,
      [e.target.name] : e.target.value
    }) 
  }

  //coloca la imagen en el state
  const leerArchivo = (e) => {
    setArchivo(e.target.files[0])
  }

  const { nombre, precio, imagen } = producto

  if (!nombre) {
    return <Spinner />
  }


  return (
    <>
      <h2>Editar Producto</h2>

      <form
        onSubmit={handleSubmit}
      >
          <legend>Llena todos los campos</legend>

          <div className="campo">
              <label>Nombre:</label>
              <input 
                type="text" 
                placeholder="Nombre Producto" 
                name="nombre"
                onChange={leerInfoProducto}
                defaultValue={nombre} 
              />
          </div>

          <div className="campo">
              <label>Precio:</label>
              <input 
                type="number" 
                name="precio" 
                min="0.00" 
                step="1" 
                placeholder="Precio"
                onChange={leerInfoProducto}
                defaultValue={precio}  
              />
          </div>

          <div className="campo">
              <label>Imagen:</label>
              { imagen ? (  
                <img src={`${import.meta.env.VITE_BACKEND_URL}/${imagen}`} alt="imagen-producto" width="300" />
              ) : null } 
              <input 
                type="file"  
                name="imagen"
                onChange={leerArchivo} 
              />
          </div>

          <div className="enviar">
                  <input type="submit" className="btn btn-azul" value="Guardar Cambios" />
          </div>
      </form>

    </>
  )
}

export default EditarProducto