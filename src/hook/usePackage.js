import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from ' ../service/api';

export const usePackage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await api.get('/package');
            setPackages(response.data.filter(pkg => pkg.sisActive));
        } catch (error) {
            message.error('Gagal memuat data Package');
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return {
        packages,
        loading,
        fetchPackages
    };
};