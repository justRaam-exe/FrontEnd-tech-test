import React from 'react';
import MainLayout from './component/layout/mainLayout';
import CustomerList from './component/customer/customerList';

const Customer = () =>  {
    return (
        <MainLayout>
            <CustomerList />
        </MainLayout>
    );
};

export default Customer;