import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import CustomerLayout from '../components/Layout/CustomerLayout';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import CustomerDashboard from '../components/Dashboard/CustomerDashboard';

const Dashboard = () => {
  const { isAdmin } = useAuth();

  // Admin menggunakan MainLayout (Sidebar)
  if (isAdmin) {
    return (
      <MainLayout>
        <AdminDashboard />
      </MainLayout>
    );
  }

  // Customer menggunakan CustomerLayout (Navbar)
  return (
    <CustomerLayout>
      <CustomerDashboard />
    </CustomerLayout>
  );
};

export default Dashboard;