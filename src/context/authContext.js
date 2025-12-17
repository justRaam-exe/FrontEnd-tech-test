// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { message } from 'antd';
// import api from '../service/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await api.get('/users', {
//         params: { username, password }
//       });

//       if (response.data.length > 0) {
//         const userData = response.data[0];
//         const { password: _, ...userWithoutPassword } = userData;
        
//         setUser(userWithoutPassword);
//         localStorage.setItem('user', JSON.stringify(userWithoutPassword));
//         message.success('Login berhasil! ');
//         return true;
//       } else {
//         message.error('Username atau password salah! ');
//         return false;
//       }
//     } catch (error) {
//       message.error('Terjadi kesalahan saat login');
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     message.success('Logout berhasil!');
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     isAdmin: user?.role === 'admin',
//     isCustomer: user?.role === 'customer'
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import api from '../service/api';

// Create context
const AuthContext = createContext(undefined);

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    console.log('AuthProvider: Initializing.. .');
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AuthProvider: User loaded from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('AuthProvider: Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
    console.log('AuthProvider: Initialization complete');
  }, []);

  // Login function
  const login = async (username, password) => {
    console.log('AuthProvider: Login attempt for:', username);
    try {
      const response = await api.get('/users', {
        params: { username, password }
      });

      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        const { password: _, ...userWithoutPassword } = userData;
        
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        message.success('Login berhasil!');
        console.log('AuthProvider: Login successful:', userWithoutPassword);
        return true;
      } else {
        message.error('Username atau password salah! ');
        console.log('AuthProvider: Login failed - invalid credentials');
        return false;
      }
    } catch (error) {
      message.error('Terjadi kesalahan saat login');
      console.error('AuthProvider: Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    console.log('AuthProvider: Logging out');
    setUser(null);
    localStorage.removeItem('user');
    message.success('Logout berhasil!');
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer'
  };

  console.log('AuthProvider: Rendering with user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export (optional, untuk backward compatibility)
export default AuthContext;