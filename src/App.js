import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './component/auth/privateRoute';
import MainLayout from './component/layout/mainLayout';
import Login from './page/login';
import Dashboard from './page/dashboard';
import Customer from './page/customer';
import Package from './page/package';
import Transaction from './page/transaction';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes with MainLayout */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              {/* Nested routes */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Admin-only route */}
              <Route 
                path="customer" 
                element={
                  <PrivateRoute adminOnly>
                    <Customer />
                  </PrivateRoute>
                } 
              />
              
              {/* Public (untuk semua logged-in users) */}
              <Route path="package" element={<Package />} />
              <Route path="transaction" element={<Transaction />} />
              
              {/* Default redirect */}
              <Route path="" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;