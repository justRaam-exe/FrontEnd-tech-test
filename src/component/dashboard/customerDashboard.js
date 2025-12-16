import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Empty } from 'antd';
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from './src/contexts/AuthContext';
import { useTransactions } from './src/hooks/useTransactions';
import dayjs from 'dayjs';
import './Dashboard.css';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions(user?.customerId);
  const [stats, setStats] = useState({
    totalPurchases: 0,
    totalSpent: 0,
    activePurchases: 0,
  });

  useEffect(() => {
    if (transactions.length > 0) {
      const totalSpent = transactions
        .filter(t => t.status === 'success')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const activePurchases = transactions.filter(t => t.status === 'pending').length;

      setStats({
        totalPurchases: transactions.length,
        totalSpent,
        activePurchases,
      });
    }
  }, [transactions]);

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
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
      title: 'Harga',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `Rp ${amount.toLocaleString('id-ID')}`,
    },
    {
      title: 'Metode Pembayaran',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => {
        const labels = {
          'e-wallet': 'E-Wallet',
          'transfer': 'Transfer Bank',
          'credit-card': 'Kartu Kredit',
        };
        return labels[method] || method;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          success: 'green',
          pending: 'orange',
          failed: 'red',
        };
        const icons = {
          success: <CheckCircleOutlined />,
          pending: <ClockCircleOutlined />,
        };
        return (
          <Tag icon={icons[status]} color={colors[status]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="dashboard-container fade-in">
      <h1 className="page-title">Dashboard Customer</h1>
      <p className="welcome-text">Selamat datang, {user?.name}!</p>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="stat-card card-hover">
            <Statistic
              title="Total Pembelian"
              value={stats.totalPurchases}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card card-hover">
            <Statistic
              title="Total Pengeluaran"
              value={stats.totalSpent}
              prefix="Rp"
              valueStyle={{ color: '#3f8600' }}
              formatter={(value) => value.toLocaleString('id-ID')}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-card card-hover">
            <Statistic
              title="Transaksi Pending"
              value={stats.activePurchases}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color:  '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="Riwayat Pembelian" 
        className="purchase-history"
        style={{ marginTop: '24px' }}
      >
        {transactions.length > 0 ? (
          <Table
            columns={columns}
            dataSource={transactions}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x:  1000 }}
            loading={loading}
          />
        ) : (
          <Empty description="Belum ada transaksi" />
        )}
      </Card>
    </div>
  );
};

export default CustomerDashboard;