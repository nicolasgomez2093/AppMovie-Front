import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clienteAxios from "../config/clienteAxios";
import { faV } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const PeliculasContext = createContext();

const PeliculasProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaId, setPeliculaId] = useState(null);
  const [peliculaInfo, setPeliculaInfo] = useState({})
  const [cargando, setCargando] = useState(false)
  const [buscador, setBuscador] = useState(false);
  const [favorito, setFavorito] = useState({})
  const [favoritos, setFavoritos] = useState([])
  const [like, setLike] = useState(true);

  const { auth} = useAuth();

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const url = `https://api.tvmaze.com/search/shows?q=star%20wars`;
        const { data } = await axios(url);
        setPeliculas(data)
      } catch (error) {
        console.log(error);
      }
    };
    consultarAPI();

  }, []);

  useEffect(() => {
    setCargando(true)
    const obtenerPelicula = async () => {
        if(!peliculaId) return;
        try {
            const url = `http://api.tvmaze.com/shows/${peliculaId}`;
            const { data } = await axios(url);
            setPeliculaInfo(data)
        } catch (error) {
            console.log(error)
        }
        setCargando(false)
    }
    obtenerPelicula()
  }, [peliculaId])

  const navigate = useNavigate();
  const handlePeliculaId = (id) => {
      setPeliculaId(id)
      navigate(`/inicio/${id}`)
  }

  
  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  // Favoritos
  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/favoritos", config);
        setFavoritos(data);
        console.log(favoritos);
      } catch (error) {
        console.log(error);
      }
    };
      obtenerFavoritos();

  }, [auth]);


    const nuevoFavorito = async (favorito) => {

      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
  
        const { data } = await clienteAxios.post(
          "/favoritos",
          favorito,
          config
        );
        setFavoritos([...favoritos, data]);
      } catch (error) {
        console.log(error);
      }
    };

    const eliminarFavorito = async (id) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const encontrarFavorito = favoritos.find((favState) =>(favState.pelicula === String(id.pelicula) && favState.creador=== auth._id) )
        const { data } = await clienteAxios.delete(`/favoritos/${encontrarFavorito._id}`, config);
 
        // Sincronizar el state
        const favoritosActualizados = favoritos.filter(
          (favoritoState) => favoritoState._id !== encontrarFavorito._id
        );
        setFavoritos(favoritosActualizados);

      } catch (error) {
        console.log(error);
      }
    };


  


  return (
    <PeliculasContext.Provider
      value={{
        peliculas,
        peliculaId,
        handlePeliculaId,
        peliculaInfo,
        handleBuscador,
        buscador,
        favoritos,
        nuevoFavorito,
        eliminarFavorito,
        setLike,
        like
      }}
    >
      {children}
    </PeliculasContext.Provider>
  );
};

export { PeliculasProvider };
export default PeliculasContext;
