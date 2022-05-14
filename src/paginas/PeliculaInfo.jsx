import Comentario from "../components/Comentario";
import FormularioComentario from "../components/FormularioComentario";
import useComentario from "../hooks/useComentario";
import usePelicula from "../hooks/usePelicula";

function PeliculaInfo() {
  const { peliculaInfo } = usePelicula();
  const { comentarios } = useComentario();

  const puntaje = Math.round(peliculaInfo.rating.average);

  return (
    <div className="items-center mx-auto p-10 px-20">
      <div className="flex justify-center">
        <img
          src={peliculaInfo.image}
          alt={`Imagen de ${peliculaInfo.name}`}
          className="object-contain h-1/2 w-1/2 md:h-1/3 md:w-1/3 object-center"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-20 mt-5">
        <div></div>
        <div className="md:flex md:justify-end">
          {puntaje <= 2 && <i className="fas fa-star text-yellow-600"></i>}
          {2 < puntaje <= 4 && (
            <>
              <i className="fas fa-star text-yellow-600"></i>
            </>
          )}
          {4 < puntaje <= 6 && (
            <>
              <i className="fas fa-star text-yellow-600"></i>
            </>
          )}
          {6 < puntaje <= 8 && (
            <>
              <i className="fas fa-star text-yellow-600"></i>
            </>
          )}
          {8 < puntaje <= 10 && (
            <>
              <i className="fas fa-star text-yellow-600"></i>
            </>
          )}
        </div>
      </div>

      <h1 className="text-yellow-600 font-black text-5xl text-center mb-5 mt-5">
        {peliculaInfo.name}
      </h1>
      <p className="text-white text-3xl">Lenguaje: {peliculaInfo.language}</p>
      <p className="text-white text-3xl">Genero: {peliculaInfo.genres}</p>
      <p className="text-white text-3xl">
        Fecha de estreno: {peliculaInfo.premiered}
      </p>

      <h4 className="text-yellow-600 font-black text-5xl text-center my-5">
        Sinapsis
      </h4>
      <p className="text-white text-3xl">{peliculaInfo.summary}</p>

      <div className="mx-auto md:w-1/2 mt-5 md:mt-10 md:justify-center">
        <FormularioComentario id={peliculaInfo.id} />
      </div>
      <div className="bg-white rounded-lg shadow mx-auto md:w-1/2 mt-5 md:mt-10 md:justify-center">
        {comentarios?.length ? (
          comentarios.map((comentario) => (
            <Comentario
              key={comentario._id}
              comentario={comentario}
              id={peliculaInfo.id}
            />
          ))
        ) : (
          <p className="text-center my-5 p-10">No hay comentarios</p>
        )}
      </div>
    </div>
  );
}
export default PeliculaInfo;
