import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import CustomerList from '../components/Customer/CustomerList';

const Customers = () => {
  return (
    <MainLayout>
      <CustomerList />
    </MainLayout>
  );
};

export default Customers;