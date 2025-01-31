import { createContext, useState, } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) :[];
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      const { accessToken, refreshToken } = response.data;
      const user = response.data.user
      console.log(response.data.message); 
      setUser(user);
      localStorage.setItem("token", JSON.stringify({ accessToken, refreshToken })); 
      localStorage.setItem("user", JSON.stringify(user)); 

    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };
  
  const register = async (username, email, password, age) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password, age });
      console.log(response.data.message); 
    } catch (error) {
      console.error("Registration error", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;


