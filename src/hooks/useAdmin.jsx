import useAuth from "./useAuth";


const useAdmin = ({comentario}) => {
    const {auth} = useAuth()

    return comentario.creador === auth._id
}

export default useAdmin