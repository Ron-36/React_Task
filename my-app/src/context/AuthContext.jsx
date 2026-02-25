import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check localStorage on first load
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Login function
  const login = () => {
    localStorage.setItem("isAuth", "true");
    setIsAuthenticated(true);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("isAuth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};