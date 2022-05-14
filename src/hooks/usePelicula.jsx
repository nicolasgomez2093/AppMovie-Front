import {useContext} from 'react'
import PeliculasContext from '../context/PeliculasProvider'

const usePelicula = () => {
    return useContext(PeliculasContext)
}

export default usePelicula