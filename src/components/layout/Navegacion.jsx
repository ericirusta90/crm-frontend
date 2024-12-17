import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { CRMContext } from '../../context/CRMContext'

const Navegacion = () => {

  const [auth, setAuth] = useContext(CRMContext)

  if (!auth.auth) return null

  return (
    
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to ="/" className="clientes">Clientes</Link>
                <Link to="/productos" className="productos">Productos</Link>
                <Link to="/pedidos" className="pedidos">Pedidos</Link>
            </nav>
        </aside>
  )
}

export default Navegacion