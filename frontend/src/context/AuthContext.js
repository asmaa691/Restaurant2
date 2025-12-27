import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context (empty box)
const AuthContext = createContext();

// 2. Create a custom hook to use this context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('flames_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('flames_user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('flames_user');
    setUser(null);
  };

  // What data/functions we want to share
  const value = {
    user,        // Current user data (or null if not logged in)
    login,       // Function to login
    logout,      // Function to logout
    loading      // Loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};