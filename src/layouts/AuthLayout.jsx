import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

function AuthLayout() {
  return (
    <>
      <div className="md:flex md:min-h-screen mx-auto p-5">
        <Banner />
        <div className="flex-1 p-5">
          <main className="mx-auto mt-5 md:mt-10 md:flex md:justify-center">
            <div className="md:w-2/3 lg:w-1/2">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default AuthLayout;
