
import Pelicula from "../components/Pelicula";
import usePelicula from "../hooks/usePelicula";

function Peliculas() {
    const {peliculas} = usePelicula()

  return (
    <>
      <h1 className="text-yellow-600 font-black text-6xl text-center">
        ¿Que pelicula vas a mirar?
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-10">
      {peliculas.map(pelicula => (
          <Pelicula key={pelicula.show.id} pelicula={pelicula} />
      ))}
      </div>
    </>
  );
}
export default Peliculas;
