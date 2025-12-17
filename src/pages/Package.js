import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import CustomerLayout from '../components/Layout/CustomerLayout';
import PackageList from '../components/Package/PackageList';

const Packages = () => {
  const { isAdmin } = useAuth();

  // Admin menggunakan Sidebar
  if (isAdmin) {
    return (
      <MainLayout>
        <PackageList />
      </MainLayout>
    );
  }

  // Customer menggunakan Navbar
  return (
    <CustomerLayout>
      <PackageList />
    </CustomerLayout>
  );
};

export default Packages;