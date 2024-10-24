import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthencticated] = useState(false);
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token"),
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [payload, setPayload] = useState({
    token: "",
  });

  useEffect(() => {
    isTokenExpired();
  }, []);

  const isTokenExpired = async () => {
    if (authToken) {
      try {
        AuthService.tokenValidation(authToken);
        localStorage.setItem("token", authToken);
        login();
      } catch (e) {
        localStorage.removeItem("token");
        logout();
        throw e;
      }
    } else {
      localStorage.removeItem("token");
    }
  };

  const login = () => {
    setIsAuthencticated(true);
    setIsAdmin(AuthService.isAdmin());
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthencticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
