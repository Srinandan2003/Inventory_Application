import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || ''); // Add role state

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Store role in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token, role]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(response.data.token);
      setRole(response.data.role); // Set role from response
      setUser({ email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (email, password, role) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
      setToken(response.data.token);
      setRole(response.data.role); // Set role from response
      setUser({ email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  const logout = () => {
    setToken('');
    setRole(''); // Clear role on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};