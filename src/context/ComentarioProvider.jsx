import { useState, createContext, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ComentarioContext = createContext();

const ComentarioProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);

  const [alerta, setAlerta] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/comentarios", config);
        setComentarios(data);
        console.log(comentarios);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerComentarios();
  }, [auth]);

  const submitComentario = async (comentario) => {
    if (comentario._id) {
      console.log("Editar");
    } else {
      await nuevoComentario(comentario);
    }
  };

  const nuevoComentario = async (comentario) => {
    console.log(comentario);
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
        "/comentarios",
        comentario,
        config
      );
      setComentarios([...comentarios, data]);
      setAlerta({
        msg: "Comentario creado con exito",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarComentario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/comentarios/${id}`, config);

      // Sincronizar el state
      const comentariosActualizados = comentarios.filter(
        (comentarioState) => comentarioState._id !== id
      );
      setComentarios(comentariosActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ComentarioContext.Provider
      value={{
        submitComentario,
        alerta,
        setAlerta,
        comentarios,
        eliminarComentario,
      }}
    >
      {children}
    </ComentarioContext.Provider>
  );
};

export { ComentarioProvider };
export default ComentarioContext;
