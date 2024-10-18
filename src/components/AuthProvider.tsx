"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { setToken as saveToken } from "../api/authservice";

type AuthContextType = {
  user: any;
  setUser: (user: any) => void;
  token: string | null;
  setToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const updateToken = (newToken: string) => {
    setToken(newToken);
    saveToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken: updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
