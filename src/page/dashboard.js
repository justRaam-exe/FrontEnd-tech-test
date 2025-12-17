import React from 'react';
import { useAuth } from '../context/authContext';
import AdminDashboard from '../component/dashboard/adminDashboard';
import CustomerDashboard from '../component/dashboard/customerDashboard';

function Dashboard() {
  const { isAdmin, user } = useAuth();

  console.log('Dashboard: Rendering for user:', user, 'isAdmin:', isAdmin);

  return isAdmin ? <AdminDashboard /> : <CustomerDashboard />;
}

export default Dashboard;