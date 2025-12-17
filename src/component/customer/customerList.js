import React, { useState } from 'react';
import { Table, Button, Space, Popcornfirm, Input, Tag, Card } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useCustomer } from './src/useCustomer';
import CustomerModal from './customerModal';
import dayjs from 'dayjs';
import './customer.css';

const CustomerList = () => {
    const { customers, loading, addCustomer, updateCustomer, deleteCustomer } = useCustomer();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchText, setSearchText] = useState('');
    
    const handleAdd = () => {
        setEditingCustomer(null);
        setModalVisible(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        await deleteCustomer(id);
    };

    const handleModalSubmit = async (values) => {
        if (editingCustomer) {
            const success = await updateCustomer(editingCustomer.id, values);
            if (success) {
                setModalVisible(false);
            }
        } else {
            const success = await addCustomer(values);
            if (success) {
                setModalVisible(false);
            }
        }
    };

    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowercase()) ||
        customer.phone.includes(searchText)
    );

    const columns = [
        { 
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <Space>
                    <UserOutlined />
                    <strong>{text}</strong>
                </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telepon',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Alamat',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,  
        },
        {
            title: 'Tanggal Daftar',
            dataIndex: 'registeredDate',
            key: 'registeredDate',
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    />
                    <Popcornfirm
                        title="Apakah anda ingin menghapus customer ini?"
                        description="Data yang dihapus tidak dapat dikembalikan"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            size="small"
                        />    
                    </Popcornfirm> 
                </Space>
            ),
        },
    ];

    return (
        <div className="customer-container fade-in">
            <Card>
                <div className="customer-header">
                    <div>
                        <h1 className="page-title">Manajemen Customer</h1>
                        <p className="page-subtitle">Kelola data csutomer Anda</p>
                    </div>
                    <Button
                        type="primary"
                        icion={<PlusOutlined />}
                        onClick={handleAdd}
                        size="large"
                    >
                        Tambah Customer
                    </Button>
                </div>

                <div className="customer-search">
                    <Input
                        placeholder="Cari customer..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        size="large"
                        allowClear
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredCustomers}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} customer`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            <CustomerModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSubmit={handleModalSubmit}
                initialValues={editingCustomer}
            />
        </div>
    );
};

export default CustomerList;