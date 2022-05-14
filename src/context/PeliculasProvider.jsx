import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PeliculasContext = createContext();

const PeliculasProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaId, setPeliculaId] = useState(null);
  const [peliculaInfo, setPeliculaInfo] = useState({})
  const [cargando, setCargando] = useState(false)
  const [buscador, setBuscador] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const url = `http://api.tvmaze.com/search/shows?q=star%20wars`;
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



  return (
    <PeliculasContext.Provider
      value={{
        peliculas,
        peliculaId,
        handlePeliculaId,
        peliculaInfo,
        handleBuscador,
        buscador,
      }}
    >
      {children}
    </PeliculasContext.Provider>
  );
};

export { PeliculasProvider };
export default PeliculasContext;
