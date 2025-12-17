import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '../services/api';

export const usePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/packages');
      setPackages(response.data.filter(pkg => pkg.isActive));
    } catch (error) {
      message.error('Gagal memuat data paket');
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    packages,
    loading,
    fetchPackages
  };
};