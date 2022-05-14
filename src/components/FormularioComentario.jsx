import { useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import useComentario from "../hooks/useComentario";

function FormularioComentario({id}) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const {submitComentario, alerta, setAlerta} = useComentario()
  const {auth} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([titulo, descripcion].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    setAlerta({});
    await submitComentario({
        titulo,
        descripcion,
        pelicula: id,
        creadorNombre: auth.nombre
      });
    
      setTitulo('')
      setDescripcion('')
      
  };
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-yellow-600 font-black text-4xl text-center mt-5">
        Deja tu comentario
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            htmlFor="titulo"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Escribe un titulo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="descripcion"
          >
            Descripcion
          </label>
          <textarea
            id="descripcion"
            placeholder="Escribe tu descripcion"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Comentario"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
}
export default FormularioComentario;
