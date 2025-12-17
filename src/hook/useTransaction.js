import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from './service/api';

export const useTransaction = (customerId = null) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = customerId ? { customerId } : {};
            const response = await api.get('/transactions', { params });
            setTransactions(response.data);
        } catch (error) {
            message.error('Gagal memuat data Transaksi');
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const createTransaction = async (transactionData) => {
        try {
            const response = await api.post('/transaction', {
                ...transactionData,
                purchaseDate: new Date().toISOString(),
                status: 'success'
            });
            setTransactions([response.data, ...transactions]);
            message.success('Transaksi berhasil!');
            return true;
        } catch (error) {
            message.error('Gagal membuat transaksi');
            console.error('Error creating transaction:', error);
            return false;
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [customerId]);

    return {
        transactions,
        loading,
        fetchTransactions,
        createTransaction
    };
};