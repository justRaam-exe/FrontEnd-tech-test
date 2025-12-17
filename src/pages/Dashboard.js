import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import CustomerDashboard from '../components/Dashboard/CustomerDashboard';

const Dashboard = () => {
  const { isAdmin } = useAuth();

  return (
    <MainLayout>
      {isAdmin ? <AdminDashboard /> : <CustomerDashboard />}
    </MainLayout>
  );
};

export default Dashboard;