import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Input, Tag, Card } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useCustomers } from '../../hooks/useCustomers';
import CustomerModal from './CustomerModal';
import dayjs from 'dayjs';
import './Customer.css';

const CustomerList = () => {
  const { customers, loading, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
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
    customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
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
      dataIndex:  'name',
      key:  'name',
      render: (text) => (
        <Space>
          <UserOutlined />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex:  'email',
      key:  'email',
    },
    {
      title:  'Telepon',
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
      dataIndex:  'registeredDate',
      key: 'registeredDate',
      render:  (date) => dayjs(date).format('DD MMM YYYY'),
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
          <Popconfirm
            title="Hapus customer ini?"
            description="Data yang dihapus tidak dapat dikembalikan."
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
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
            <p className="page-subtitle">Kelola data customer Anda</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
          >
            Tambah Customer
          </Button>
        </div>

        <div className="customer-search">
          <Input
            placeholder="Cari customer (nama, email, atau telepon)..."
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