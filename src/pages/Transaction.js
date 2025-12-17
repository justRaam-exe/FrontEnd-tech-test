import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import TransactionList from '../components/Transaction/TransactionList';

const Transactions = () => {
  return (
    <MainLayout>
      <TransactionList />
    </MainLayout>
  );
};

export default Transactions;