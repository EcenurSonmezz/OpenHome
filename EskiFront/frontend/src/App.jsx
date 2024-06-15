import { LoginationContext } from "./pages/state/context";
import { Outlet, useLocation } from "react-router-dom";
import { NavbarProfil } from "./components/NavbarProfil";
import { NavbarSelector } from "./components/NavbarSelector";

function App() {
  const location = useLocation();

  // Profil sayfasında mı kontrolü
  const isProfilePage = location.pathname.includes("/profile");

  return (
    <LoginationContext>
      {isProfilePage ? <NavbarProfil /> : <NavbarSelector />}
      <div className="container mt-3">
        <Outlet />
      </div>
    </LoginationContext>
  );
}

export default App;
