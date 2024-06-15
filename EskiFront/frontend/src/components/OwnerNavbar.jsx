import { Link } from "react-router-dom";
import { LoginContext } from "../pages/state/context";
import { useContext } from "react";
import { FaSignOutAlt, FaUser, FaPlusCircle, FaBuilding } from "react-icons/fa";
import NotificationIcon from "./NotificationIcon";
import "./navbar.css";

export function OwnerNavbar() {
  const { login, onLogoutSuccess } = useContext(LoginContext);

  const onClickLogout = () => {
    onLogoutSuccess();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "black" }}>
      <div className="container-fluid">
        <Link className="navbar-brand ml-auto" to="/" style={{ color: "white" }}>
          Open Home
        </Link>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <Link className="nav-link" to="/" style={{ color: "white" }}>
                <FaHome />
                <div>Home</div>
              </Link> */}
            </li>
            <li className="nav-item">
              <Link to="/properties" className="nav-link" style={{ color: "white" }}>
                <FaBuilding />
                <div>Mülklerim</div>
              </Link>
            </li>
            {/*nonfic*/}
            <li className="nav-item">
              <Link to="/house" className="nav-link" style={{ color: "white" }}>
                <FaPlusCircle />
                <div>Ev Ekle</div>
              </Link>
              </li>
            <li className="nav-item">
              <Link to={`/profile/${login.id}`} className="nav-link" style={{ color: "white" }}>
                <FaUser />
                <div>Profil</div>
              </Link>
            </li>
            <li className="nav-item" style={{color:"white"}}>
              <NotificationIcon />
            </li>

            <li className="nav-item">
              <Link
                to="/"
                onClick={onClickLogout}
                className="nav-link"
                style={{ color: "white" }}
              >
                
                <FaSignOutAlt />
                <div>Çıkış Yap</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
