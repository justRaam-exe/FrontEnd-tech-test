import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Statistic, Tag, Spin } from 'antd';
import {
    ShoppingOutlined,
    UserOutlined,
    DollarOutlined,
    RiseOutlined,
} from '@ant-design/icons';
import { useTransaction } from './src/hook/useTransaction';
import { useCustomer } from './src/hook/useCustomer';
import dayjs from 'dayjs';
import './dashboard.css'

const AdminDashboard = () => {
    const { transaction, loading: txLoading } = useTransaction();
    const { customers, loading: custLoading } = useCustomer();
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalTransactions: 0,
        totalCustomers: 0,
        successRate: 0,
    });

    useEffect(() => {
        if (transaction.length > 0) {
            const totalRevenue = transaction
                .filter(t => t.status === 'success')
                .reduce((sum, t) => sum + t.amount, 0);
            
            const successTransactions = transaction.filter(t => t.status === 'success').length;
            const successRate = (successTransactions / transaction.length) * 100;

            setStats({
                totalRevenue,
                totalTransactions: transaction.length,
                totalCustomers: customers.length,
                successRate: successRate.toFixed(1),
            });
        }
    }, [transaction, customers]);

    const recentTransactions = transaction.slice(0, 5);

    const columns = [
        {
            title: 'Tanggal',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Paket',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Jumlah',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `Rp ${amount.toLocaleString('id-ID')}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors = {
                    success: 'green',
                    pending: 'yellow',
                    failed: 'red',
                };
                return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
            },
        },
    ];

    if (txLoading || custLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="dashboard-container fade-in">
            <h1 className="page-title">Dashboard Admin</h1>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card className="stat-card card-hover">
                        <Statistic
                            title="Total Revenue"
                            value={stats.totalRevenue}
                            prefix="Rp"
                            suffix=""
                            valueStyle={{ color: '#3f8600' }}
                            formatter={(value) => value.toLocaleString('id-ID')}
                        />
                        <DollarOutlined className="stat-icon" style={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="stat-card card-hover">
                        <Statistic
                            title="Total Transaksi"
                            value={stats.totalTransactions}
                            prefix={<ShoppingOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="stat-card card-hover">
                        <Statistic
                            title="Total Customers"
                            value={stats.totalCustomers}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="stat-card card-hover">
                        <Statistic
                            title="Success Rate"
                            value={stats.successRate}
                            prefix={<RiseOutlined />}
                            suffix="%"
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card 
                title="Transaksi Terbaru"
                className="recent-transactions"
                style={{ marginTop: '24px'}}
            >
                <Table
                    columns={columns}
                    dataSource={recentTransactions}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 800 }}
                />
            </Card>
        </div>
    )
}

export default AdminDashboard;