
import Favorito from "../components/Favorito";
import usePelicula from "../hooks/usePelicula";

function Favoritos() {
  const {peliculas} = usePelicula()

  return (
    <>
      <h1 className="text-yellow-600 font-black text-6xl text-center">
        Estas son tus pelis favoritas!
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-10">
      {peliculas.map(pelicula => (
          <Favorito key={pelicula.show.id} pelicula={pelicula} />
      ))}
      </div>
    </>
  );
}
export default Favoritos;
