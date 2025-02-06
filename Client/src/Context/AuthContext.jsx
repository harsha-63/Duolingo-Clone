import { createContext, useState, } from "react";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstence";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) :[];
  });
 



  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(`user/users`, {
      });
      return response.data;

    } catch (error) {
      console.error("Error fetching users", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }, {
        withCredentials: true
      });
      const { accessToken } = response.data;
      const user = response.data.user
      setUser(user);
      localStorage.setItem("accessToken", accessToken); 
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
    localStorage.removeItem("accessToken");
  };

const updateProfile = async (imageUrl) => {
  try {
    const token = localStorage.getItem('token'); // or however you're storing the token

    const response = await axiosInstance.put('/user/profile', {
      profileImage: imageUrl
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure this is included
      }
    });

    console.log("Profile updated successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Error updating profile');
  }
};




  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout,getAllUsers,updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;


