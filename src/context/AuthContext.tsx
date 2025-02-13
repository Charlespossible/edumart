import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
//import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  firstName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
  
      // Ensure the response contains the user object with firstName
      if (!response.data.user) {
        throw new Error("No user data received");
      }
  
      const { firstName, role } = response.data.user;
      console.log("Extracted User Data:", { firstName, role })
      // Store user data in cookies
      Cookies.set("firstName", firstName, { secure: false, sameSite: "Lax", path: "/" });
      Cookies.set("role", role, { secure: false, sameSite: "Lax", path: "/" });
      console.log("Cookies Set:", Cookies.get("firstName"), Cookies.get("role")); 
      setUser({ firstName, role });
  
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};