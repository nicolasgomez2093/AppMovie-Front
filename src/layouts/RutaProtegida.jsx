import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";


function RutaProtegida() {

    const {auth, cargando} = useAuth()

    if(cargando) {
        return 'Cargando'
    }

  return (
    <>
    {auth._id ? (
            <div className=''>
            <Header />
            <div className='md:flex md:min-h-screen'>
                <main className='flex-1 p-10'>
                    <Outlet />
                </main>
            </div>
        </div>

     ) : <Navigate to="/" /> }
    </>
  );
}
export default RutaProtegida;