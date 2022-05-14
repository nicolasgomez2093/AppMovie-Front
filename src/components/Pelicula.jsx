import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import usePelicula from "../hooks/usePelicula";

function Pelicula({ pelicula }) {
  const [like, setLike] = useState(true);
  const { name, image, id } = pelicula.show;

  const auth = useAuth();

  const { handlePeliculaId, nuevoFavorito, eliminarFavorito, favoritos } =
    usePelicula();

  useEffect(() => {
    const tieneLike = favoritos.filter(
      (favoritoState) => favoritoState.pelicula === String(pelicula.show.id)
    );
    const admin = tieneLike.some(
      (favState) => favState.creador === auth.auth._id
    );
    if (admin) {
      setLike(!like);
      console.log("llegue");
    }
  }, [auth]);

  const handlePeliculaLike = async (id) => {
    setLike(!like);
    if (like) {
      await nuevoFavorito({ pelicula: id });
    } else {
      await eliminarFavorito({ pelicula: id });
    }
  };

  return (
    <div className="border p-3 shadow bg-white">
      <div className="flex justify-center">
        <img src={image.medium} alt={`Imagen de ${name}`} />
      </div>
      <div className="flex justify-end mr-5">
        <button
          name="like"
          className="mt-2"
          onClick={() => {
            handlePeliculaLike(pelicula.show.id);
          }}
        >
          {like ? (
            <i className="far fa-heart text-red-800 fa-2x"></i>
          ) : (
            <i className="fas fa-heart text-red-800 fa-2x"></i>
          )}
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-2xl font-bold">{name}</h3>
      </div>
      <input
        type="submit"
        onClick={() => {
          handlePeliculaId(pelicula.show.id);
        }}
        value="Leer Mas"
        className="bg-sky-700 inset-x-0 bottom-0  w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </div>
  );
}
export default Pelicula;
