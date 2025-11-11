// src/context/AuthContext.js

// Centralized Auth State for user and token
// Prevents repeated localStorage access
// Works across protected routes, headers, UI components
// Scalable with refresh tokens, role-based access, multi-user system

// Can use anywhere in the app:
// const { user, token, logout } = useAuth();

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (e.g., role, name)
  const [loading, setLoading] = useState(true);

  // 🔍 On app load, verify session by calling protected endpoint
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Step 1: Try to get user with current access token
        const res = await axiosInstance.get("/users/me");
        setUser(res.data.data);
      } catch (err) {
        // Step 2: If unauthorized, attempt refresh
        if (err.response?.status === 401) {
          try {
            await axiosInstance.post("/auth/refresh-token"); // backend sets new access token cookie
            const retryRes = await axiosInstance.get("/users/me");
            setUser(retryRes.data.data);
          } catch (refreshErr) {
            // Step 3: Refresh also failed → logout
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ====================================================
  // Login Functionality -> Store user and token data
  // ====================================================
  const login = (userData) => {
    setUser(userData); // set from login response
  };

  // ====================================================
  // Logout Functionality -> Remove user and token data
  // ====================================================
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout"); // backend clears cookies
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  // ====================================================
  // Update User Profile Functionality
  // ====================================================
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use auth state
export const useAuth = () => useContext(AuthContext);
