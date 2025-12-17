import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, message } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/authContext';
import api from '../../service/api';
import './dashboard.css';

function CustomerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPurchases: 0,
    totalSpent: 0,
    pendingTransactions: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.customerId) {
      fetchCustomerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.customerId]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      
      // Fetch customer transactions
      const response = await api.get(`/transactions? customerId=${user.customerId}`);
      const customerTransactions = response.data || [];

      // Calculate stats
      const successTransactions = customerTransactions.filter((t) => t.status === 'success');
      const pendingTransactions = customerTransactions.filter((t) => t.status === 'pending');
      const totalSpent = successTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);

      setStats({
        totalPurchases: successTransactions.length,
        totalSpent,
        pendingTransactions: pendingTransactions.length,
      });

      // Sort by date descending
      const sorted = customerTransactions.sort(
        (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
      );
      
      setTransactions(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customer data:', error);
      message.error('Gagal memuat data');
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Paket',
      dataIndex: 'packageName',
      key:  'packageName',
    },
    {
      title: 'Kuota',
      dataIndex: 'quota',
      key: 'quota',
    },
    {
      title:  'Harga',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `Rp ${amount?.toLocaleString('id-ID') || 0}`,
    },
    {
      title: 'Metode Pembayaran',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => {
        const methodMap = {
          'e-wallet': 'E-Wallet',
          'transfer':  'Transfer Bank',
          'credit-card': 'Kartu Kredit',
        };
        return methodMap[method] || method;
      },
    },
    {
      title:  'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'success' ? 'green' :  status === 'pending' ? 'orange' : 'red'}>
          {status?.toUpperCase() || 'UNKNOWN'}
        </Tag>
      ),
    },
    {
      title: 'Tanggal',
      dataIndex: 'purchaseDate',
      key:  'purchaseDate',
      render: (date) => new Date(date).toLocaleDateString('id-ID'),
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard Saya</h1>
      <p className="welcome-text">Halo, {user?.name}! Berikut adalah ringkasan aktivitas Anda.</p>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <ShoppingCartOutlined className="stat-icon" style={{ color: '#1890ff' }} />
            <Statistic
              title="Total Pembelian"
              value={stats.totalPurchases}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <DollarOutlined className="stat-icon" style={{ color: '#3f8600' }} />
            <Statistic
              title="Total Pengeluaran"
              value={stats.totalSpent}
              valueStyle={{ color: '#3f8600' }}
              prefix="Rp"
              formatter={(value) => value.toLocaleString('id-ID')}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card">
            <ClockCircleOutlined className="stat-icon" style={{ color: '#faad14' }} />
            <Statistic
              title="Transaksi Pending"
              value={stats.pendingTransactions}
              valueStyle={{ color:  '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Transaction History */}
      <Card title="Riwayat Pembelian" className="purchase-history" style={{ marginTop:  '24px' }}>
        <Table
          columns={columns}
          dataSource={transactions}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}

export default CustomerDashboard;