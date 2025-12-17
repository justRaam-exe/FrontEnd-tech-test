import React from 'react';
import MainLayout from './component/layout/mainLayout';
import TransactionList from './component/transaction/transactionList';

const Transaction = () => {
    return (
        <MainLayout>
            <TransactionList />
        </MainLayout>
    );
};

export default Transaction;