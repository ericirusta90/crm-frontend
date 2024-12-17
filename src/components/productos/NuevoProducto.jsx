import { useState } from "react"
import Swal from 'sweetalert2'
import clienteAxios from "../../config/axios"


const NuevoProducto = () => {

  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  })

  const [archivo, setArchivo] = useState('')

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

  //almacenar nuevo prod en la BD
  const handleSubmit = async e => {
    e.preventDefault()

    //formdata
    const formData = new FormData()
    formData.append('nombre', producto.nombre)
    formData.append('precio', producto.precio)
    formData.append('imagen', archivo)

    try {
      const res = await clienteAxios.post('/productos', formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      
      if (res.status===201) {
        Swal.fire({
          title: "Se agregó el Producto",
          text: res.data.msg,
          icon: "success"
        });
      }

      

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un Error",
        text: 'Vuelve a intentarlo' 
      });
    }

  }

  return (
    <>
      <h2>Nuevo Producto</h2>

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
              />
          </div>

          <div className="campo">
              <label>Imagen:</label>
              <input 
                type="file"  
                name="imagen"
                onChange={leerArchivo} 
              />
          </div>

          <div className="enviar">
                  <input type="submit" className="btn btn-azul" value="Agregar Producto" />
          </div>
      </form>

    </>
  )
}

export default NuevoProducto