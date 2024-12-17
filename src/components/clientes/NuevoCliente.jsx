import { useState } from "react"
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

const NuevoCliente = () => {
   
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  })
  
  //leer los datos del form
  const actualizarState = e => {
    //almaceno lo q el usuario escribe en el state
    setCliente({
        //obtener copia state actual
        ...cliente,
        [e.target.name] : e.target.value
    })
    
  }

  //validar el form
  const validarCliente = () => {
    const {nombre, apellido, empresa, email, telefono} = cliente  
    let valido= !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length 
    return valido
  }

  //envio de peticion
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const {data} = await clienteAxios.post('/clientes', cliente)
        //console.log(data)

        Swal.fire({
            title: "Se agregó el Cliente",
            text: data.msg,
            icon: "success"
          });

    } catch (error) {
        //console.error('Error:', error.response.data.msg);
        Swal.fire({
            icon: "error",
            title: "Hubo un Error",
            text: error.response.data.msg 
          });
    }
    
  }

  return (
    <>
        <h2>Nuevo Cliente</h2>

        <form
            onSubmit={handleSubmit}
        >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Cliente"
                            disabled={validarCliente()}
                        />
                </div>

            </form>

    </>
  )
}

export default NuevoCliente