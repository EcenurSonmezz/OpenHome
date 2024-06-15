import { useContext, useEffect } from "react";
import { LoginContext } from "../pages/state/context";
import { OwnerNavbar } from "./OwnerNavbar";
import { GuestNavbar } from "./GuestNavbar";

export function NavbarSelector() {
  const { login } = useContext(LoginContext);

  useEffect(() => {

    // login ve role'ü konsola yazdır
    if (login && login.role) {
      console.log("User role:", login.role);
    } else {
      console.log("No userDto available or role is undefined");
    }
  }, [login]);

  // Kullanıcının rolüne göre hangi navbarın kullanılacağını belirle
  const navbarComponent = login && login.role === 'owner' ? <OwnerNavbar /> : <GuestNavbar />;

  return (
    <>
      {navbarComponent}
    </>
  );
}
