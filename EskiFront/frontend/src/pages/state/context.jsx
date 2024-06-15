import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { loadLoginState, storeLoginState } from "./storage";

export const LoginContext = createContext();

export function LoginationContext({ children }) {
  const [login, setLogin] = useState(loadLoginState());

  const onLoginSuccess = (data) => {
    setLogin(data);
    storeLoginState(data);
  };

  const onLogoutSuccess = () => {
    setLogin({ id: 0, role: "guest" });
    storeLoginState({ id: 0, role: "guest" });
  };

  return (
    <LoginContext.Provider
      value={{
        login,
        onLoginSuccess,
        onLogoutSuccess
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

LoginationContext.propTypes = {
  children: PropTypes.node.isRequired,
};
