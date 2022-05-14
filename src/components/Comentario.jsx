
import { formatearFecha } from "../helpers/formatearFecha";
import useAdmin from "../hooks/useAdmin";
import useComentario from "../hooks/useComentario";

function Comentario({ comentario, id }) {

  const admin = useAdmin({ comentario });
  const {eliminarComentario} = useComentario()

  const handleClick = () => {
    if(confirm('¿Deseas eliminar el proyecto?')){
      eliminarComentario(comentario._id)
    }
  }

  return (
    String(id) === String(comentario.pelicula) && (
      <div className="border-b p-5 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <p className="mb-2 text-xl">{comentario.titulo}</p>
          <p className="mb-2 text-lg text-gray-500 ">
            {comentario.descripcion}
          </p>
          <p className="mb-2 text-sm">{formatearFecha(comentario.createdAt)}</p>
          <p className="mb-2 text-xs bg-cyan-900 text-white uppercase p-1 rounded-lg">
            Comentado por: {comentario.creadorNombre}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          {admin && (
            <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={handleClick}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    )
  );
}
export default Comentario;
