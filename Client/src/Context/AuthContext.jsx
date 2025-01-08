import { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", { email, password });
      const { data } = response;
      console.log("Login response:", data); 
      setAuth(data); 
      localStorage.setItem("user", JSON.stringify(data)); 
    } catch (error) {
      console.error("Login error", error);
      throw error; 
    }
  };

  const register = async (username, email, password, age) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/register", { username, email, password, age });
      const { data } = response;
      setAuth(data);
      console.log(data); 
      localStorage.setItem("user", JSON.stringify(data)); 
    } catch (error) {
      console.error("Registration error", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
