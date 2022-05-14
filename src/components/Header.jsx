import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePelicula from "../hooks/usePelicula";
import Busqueda from './Buscador'

function Header() {
const {handleBuscador} = usePelicula()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    localStorage.removeItem('token')
  }

  const navigate = useNavigate()

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-yellow-600 font-black text-4xl mb-5 md:mb-0 text-center cursor-pointer" onClick={() => navigate(`/inicio`)}>
        Movie App
      </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="uppercase font-bold" onClick={handleBuscador}>
          <i className="fas fa-search mr-2"></i>
            Buscar Pelicula
            
          </button>
          <Link to="/" className="font-bold uppercase">
            Favoritos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesion
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
}
export default Header;