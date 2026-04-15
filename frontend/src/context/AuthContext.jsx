import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("biga_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (nextUser, token) => {
    localStorage.setItem("biga_user", JSON.stringify(nextUser));
    localStorage.setItem("biga_token", token);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("biga_user");
    localStorage.removeItem("biga_token");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
