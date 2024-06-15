import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext } from "../pages/state/context";
import { FaSignOutAlt, FaUser, FaCog, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import "./navbar.css";

export function GuestNavbar() {
  const { login, onLogoutSuccess } = useContext(LoginContext);

  useEffect(() => {
    console.log("loginState:", login); // loginState verisini kontrol et
  }, [login]);

  const onClickLogout = () => {
    onLogoutSuccess();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "lightgreen" }}>
      <div className="container-fluid">
        <Link className="navbar-brand ml-auto" to="/">
          Open Home
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/home">
                <FaHome />
                <div>Home</div>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to={`/profile/${login.id}`} className="nav-link">
                <FaUser />
                <div>Profile</div>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="#" className="nav-link">
                <FaTicketAlt />
                <div>Tickets</div>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <FaCog />
                <div>Ayarlar</div>
              </Link>
            </li>
            {login && login.id === 0 ? (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <FaUserPlus /> Kayıt Ol
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt /> Giriş Yap
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* <li className="nav-item">
                  <Link to={`/profile/${login.id}`} className="nav-link">
                    <FaUser /> Profil
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    to="/"
                    onClick={onClickLogout}
                    className="nav-link"
                  >
                    <FaSignOutAlt /> Çıkış Yap
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
