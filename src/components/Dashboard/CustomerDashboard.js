import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Empty, Button } from 'antd';
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ShoppingOutlined,
  FireOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../hooks/useTransactions';
import { usePackages } from '../../hooks/usePackages';
import dayjs from 'dayjs';
import './Dashboard.css';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { transactions, loading } = useTransactions(user?.customerId);
  const { packages } = usePackages();
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

  // Get top 3 popular packages
  const popularPackages = packages.slice(0, 3);
  
  // Get recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  const columns = [
    {
      title: 'Tanggal',
      dataIndex:  'purchaseDate',
      key: 'purchaseDate',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Paket',
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: 'Harga',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `Rp ${amount.toLocaleString('id-ID')}`,
    },
    {
      title:  'Status',
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
      {/* Welcome Section */}
      <div className="welcome-section">
        <div>
          <h1 className="page-title">Selamat Datang, {user?.name}!  👋</h1>
          <p className="welcome-text">Temukan paket data terbaik untuk kebutuhan internet Anda</p>
        </div>
        <Button 
          type="primary" 
          size="large" 
          icon={<ShoppingOutlined />}
          onClick={() => navigate('/packages')}
          className="cta-button"
        >
          Beli Paket Sekarang
        </Button>
      </div>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
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
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Popular Packages Section */}
      <Card 
        title={
          <span>
            <FireOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
            Paket Populer
          </span>
        }
        extra={
          <Button type="link" onClick={() => navigate('/packages')}>
            Lihat Semua →
          </Button>
        }
        className="popular-packages-card"
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          {popularPackages.map((pkg, index) => (
            <Col xs={24} sm={8} key={pkg.id}>
              <Card 
                className="mini-package-card card-hover"
                hoverable
              >
                <div className="mini-package-header">
                  {index === 0 && <TrophyOutlined style={{ color: '#ffd700', fontSize: 24 }} />}
                  <Tag color={index === 0 ? 'gold' : index === 1 ? 'blue' : 'green'}>
                    #{index + 1} Terlaris
                  </Tag>
                </div>
                <h3 className="mini-package-name">{pkg.name}</h3>
                <div className="mini-package-info">
                  <div className="mini-quota">
                    <strong>{pkg.quota}</strong>
                    <span>Kuota</span>
                  </div>
                  <div className="mini-price">
                    <strong>Rp {pkg.price.toLocaleString('id-ID')}</strong>
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                <Button 
                  type="primary" 
                  block 
                  onClick={() => navigate('/packages')}
                  style={{ marginTop: 12 }}
                >
                  Beli Sekarang
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Transaction History */}
      <Card 
        title="Riwayat Pembelian Terakhir" 
        className="purchase-history"
        extra={
          transactions.length > 5 && (
            <Button type="link" onClick={() => navigate('/transactions')}>
              Lihat Semua →
            </Button>
          )
        }
      >
        {transactions.length > 0 ? (
          <Table
            columns={columns}
            dataSource={recentTransactions}
            rowKey="id"
            pagination={false}
            scroll={{ x: 600 }}
            loading={loading}
          />
        ) : (
          <Empty 
            description={
              <span>
                Belum ada transaksi.  <br />
                <Button 
                  type="link" 
                  onClick={() => navigate('/packages')}
                  style={{ padding: 0 }}
                >
                  Mulai belanja sekarang! 
                </Button>
              </span>
            }
          />
        )}
      </Card>
    </div>
  );
};

export default CustomerDashboard;