import {useContext} from 'react'
import ComentarioContext from '../context/ComentarioProvider'

const useComentario = () => {
    return useContext(ComentarioContext)
}

export default useComentario