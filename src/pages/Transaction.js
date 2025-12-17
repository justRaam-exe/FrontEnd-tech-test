import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/Layout/MainLayout';
import CustomerLayout from '../components/Layout/CustomerLayout';
import TransactionList from '../components/Transaction/TransactionList';

const Transactions = () => {
  const { isAdmin } = useAuth();

  // Admin menggunakan Sidebar
  if (isAdmin) {
    return (
      <MainLayout>
        <TransactionList />
      </MainLayout>
    );
  }

  // Customer menggunakan Navbar
  return (
    <CustomerLayout>
      <TransactionList />
    </CustomerLayout>
  );
};

export default Transactions;