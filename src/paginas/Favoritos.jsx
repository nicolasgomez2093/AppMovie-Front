
import Pelicula from "../components/Pelicula";
import usePelicula from "../hooks/usePelicula";

function Favoritos() {
    const {favoritos} = usePelicula()

  return (
    <>
      <h1 className="text-yellow-600 font-black text-6xl text-center">
        Estas son tus peliculas favoritas!
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-10">
      {favoritos.map(favorito => (
          <Pelicula key={favorito.pelicula} pelicula={favorito} />
      ))}
      </div>
    </>
  );
}
export default Favoritos;
