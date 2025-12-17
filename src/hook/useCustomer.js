import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '../service/api';

export const useCustomers = () => {
    const[customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/customer');
            setCustomers(response.data);
        } catch (error) {
            message.error('Gagal memuat data Customer');
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCustomer = async (customerData) => {
        try {
            const response = await api.post('/customer', {
                ...customerData,
                registeredDate: new Date().toISOString().split('T')[0],
                status: 'active'
            });
            setCustomers([...customers, response.data]);
            message.success('Customer berhasil ditambahkan! ');
            return true;
        } catch (error) {
            message.error('Gagal menambahkan customer');
            console.error('Error adding customer:', error);
            return false;
        }
    };

    const updateCustomer = async (id, customerData) => {
        try {
            const response = await api.put(`/customer/${id}`, customerData);
            setCustomers(customers.map(c => c.id === id ? response.data : c));
            message.success('Customer berhasil diperbarui!');
            return true;
        } catch (error) {
            message.error('Gagal memperbarui customer');
            console.error('Error updating customer:', error);
            return false;
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await api.delete(`/customer/${id}`);
            setCustomers(customers.filter(c => c.id !== id));
            message.success('Customer berhasil dihapus!');
            return true;
        } catch (error) {
            message.error('Gagal menghapus customer');
            console.error('Error deleting customer:', error);
            return false; 
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return {
        customers,
        loading,
        fetchCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer
    };
};