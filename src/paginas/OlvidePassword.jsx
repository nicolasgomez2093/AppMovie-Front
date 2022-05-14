import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import {useNavigate} from 'react-router-dom'


function OlvidePassword() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email})
      const {token} = data
      navigate(`/olvide-password/${token}`)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  };

  const { msg } = alerta;

    return (
        <>
      <h1 className="text-yellow-600 font-black text-6xl text-center">
        Recupera tu contraseña!
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
            <div className="my-5">
              <label
                htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email de registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange= {(e) =>  setEmail(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Confirmar"
              className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </form>
          <nav className="lg:flex lg:justify-between">
            <Link
              to="/"
              className="block text-center my-5 text-slate-200 text-sm uppercase"
            >
              ¿Ya tienes una cuenta? Inicia sesion!
            </Link>
            <Link
              to="/registrar"
              className="block text-center my-5 text-slate-200 text-sm uppercase"
            >
              ¿No tienes una cuenta? Registrate!
            </Link>
          </nav>
        </>
      );
    
}
export default OlvidePassword