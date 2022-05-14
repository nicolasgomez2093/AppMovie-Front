import { useState } from "react"
import usePelicula from "../hooks/usePelicula"


function Pelicula({pelicula}) {
    const [like, setLike] = useState(false)
    const {name, image, id} = pelicula.show

    const {handlePeliculaId} = usePelicula()

    const handleLickClick = () => {
        setLike(!like)
    }
    
  return (
    <div className="border p-3 shadow bg-white">
        <div className="flex justify-center">
            <img src={image.medium} alt={`Imagen de ${name}`} />
        </div>
        <div className="flex justify-end mr-5">
            <button name="like" className="mt-2" onClick={() => {
                handleLickClick()
            }}>
                {like ? (<i class="fas fa-heart text-red-800 fa-2x"></i>) : (<i class="far fa-heart text-red-800 fa-2x"></i>)}
            </button>
        </div>
        <div className="p-3">
            <h3 className="text-2xl font-bold">{name}</h3>

        </div>
        <input
            type="submit"
            onClick={() => {handlePeliculaId(pelicula.show.id)}}
            value="Leer Mas"
            className="bg-sky-700 inset-x-0 bottom-0  w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />

    </div>
  )
}
export default Pelicula