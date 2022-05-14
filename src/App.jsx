import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ComentarioProvider } from "./context/ComentarioProvider";
import { PeliculasProvider } from "./context/PeliculasProvider";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import Login from "./paginas/Login";
import NuevoPassword from "./paginas/NuevoPassword";
import OlvidePassword from "./paginas/OlvidePassword";
import PeliculaInfo from "./paginas/PeliculaInfo";
import Peliculas from "./paginas/Peliculas";
import Registrar from "./paginas/Registrar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PeliculasProvider>
          <ComentarioProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
            </Route>

            <Route path="/inicio/" element={<RutaProtegida />}>
              <Route index element={<Peliculas />} />
              <Route path=":id" element={<PeliculaInfo />} />
            </Route>
          </Routes>
          </ComentarioProvider>
        </PeliculasProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
