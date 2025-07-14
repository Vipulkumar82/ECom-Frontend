import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>('');


  // Persist user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const userData = localStorage.getItem("user");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};