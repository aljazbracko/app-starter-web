"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface AuthContextType {
  user: IJwtUser | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

interface DecodedToken {
  sub?: number;
  role?: string;
  exp?: number;
}

function parseJwtUser(token: string): IJwtUser | null {
  try {
    const decoded = jwt.decode(token) as DecodedToken | null;
    if (!decoded?.sub || !decoded?.role) {
      return null;
    }

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return { id: decoded.sub, role: decoded.role };
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IJwtUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
      setUser(parseJwtUser(savedToken));
    }
    setLoading(false); 
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    // Also set cookie for middleware
    document.cookie = `accessToken=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}`; 
    setToken(newToken);
    setUser(parseJwtUser(newToken));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    // Remove cookie
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
