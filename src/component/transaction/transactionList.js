import React, { useState } from 'react';
import { Table, Tag, Input, Select, DatePicker, Card, Space, Statistic, Row, Col } from 'antd';
import {
    SearchOutlined,
    ShoppingCartOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/authContext';
import { useTransactions } from '../../hook/useTransaction';
import dayjs from 'dayjs';
import './transaction.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionList = () => {
    const { user, isAdmin } = useAuth();
    const { transactions, loading } = useTransactions(isAdmin ? null : user?.customerId);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState(null);

    let filteredTransactions = transactions.filter(tx => {
        const matchSearch = tx.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                            tx.packageName.toLowerCase().includes(searchText.toLowerCase());
        const matchStatus = statusFilter === 'all' || tx.status === statusFilter;

        let matchDate = true;
        if (dateRange && dateRange.length === 2) {
            const txDate = dayjs(tx.purchaseDate);
            matchDate = txDate.isAfter(dateRange[0]) && txDate.isBefore(dateRange[1]);
        }
        return matchSearch && matchStatus && matchDate;
    });

    const stats = {
        total: filteredTransactions.length,
        totalAmount: filteredTransactions
            .filter(t => t.status === 'success')
            .reduce((sum, t) => sum + t.amount, 0),
        success: filteredTransactions.filter(t => t.status === 'success').length,
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Tanggal',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
            sorter: (a, b) => dayjs(a.purchaseDate).unix() - dayjs(b.purchaseDate).unix(),
        },
        ...(isAdmin ? [{
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
        }] : []),
        {
            title: 'Paket',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Kuota',
            dataIndex: 'quota',
            key: 'quota',
        },
        {
            title: ' Harga',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `Rp ${amount.toLocaleString('id-ID')}`,
            sorter: (a, b) => a.amount - b.amount,
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
                    pending: 'yellow',
                    failed: 'red',
                };
                return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
            },
            filters: [
                { text: 'Berhasil', value: 'success' },
                { text: 'Pending', value: 'pending' },
                { text: 'Gagal', value: 'failed' },
            ],
            onFilter: (value, record) => value === 'all' || record.status === value,
        },
    ];

    return (
        <div className="transaction-container fade-in">
            <h1 className="page-title">Manajemen Transaksi</h1>
            <p className="page-subtitle">Kelola dan monitor transaksi</p>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Total Transaksi"
                            value={stats.total}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#1889ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Total Pendapatan"
                            value={stats.totalAmount}
                            prefix="Rp"
                            valueStyle={{ color: '#3f8600' }}
                            formatter={(value) => value.toLocaleString('id-ID')}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <Statistic
                            title="Transaksi Berhasil"
                            value={stats.success}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Input
                                placeholder="Cari transaksi..."
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                size="large"
                                allowClear
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                size="large"
                                style={{ width: '100%' }}
                            >
                                <Option value="all">Semua Status</Option>
                                <Option value="success">Success</Option>
                                <Option value="pending">Pending</Option>
                                <Option value="failed">Failed</Option>
                            </Select>
                        </Col>
                        <Col xs={12} md={6}>
                            <RangePicker
                                onChange={setDateRange}
                                size="large"
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                            />
                        </Col>
                    </Row>

                    <Table
                        columns={columns}
                        dataSource={filteredTransactions}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} transaksi`,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Space>
            </Card>
        </div>
    );
};

export default TransactionList;