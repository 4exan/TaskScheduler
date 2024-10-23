import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthencticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [payload, setPayload] = useState({
    token: "",
  });

  useEffect(() => {
    isTokenExpired();
  }, []);

  const isTokenExpired = async () => {
    if (isAuthenticated) {
      login();
    } else {
      logout();
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
