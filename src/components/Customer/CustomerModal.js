import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const CustomerModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? 'Edit Customer' : 'Tambah Customer'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Simpan"
      cancelText="Batal"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        name="customerForm"
      >
        <Form.Item
          name="name"
          label="Nama Lengkap"
          rules={[
            { required: true, message:  'Nama harus diisi!' },
            { min: 3, message: 'Nama minimal 3 karakter!' },
          ]}
        >
          <Input placeholder="Masukkan nama lengkap" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email harus diisi!' },
            { type: 'email', message: 'Format email tidak valid!' },
          ]}
        >
          <Input placeholder="contoh@email.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Nomor Telepon"
          rules={[
            { required: true, message: 'Nomor telepon harus diisi!' },
            { pattern: /^[0-9]{10,13}$/, message: 'Nomor telepon harus 10-13 digit!' },
          ]}
        >
          <Input placeholder="081234567890" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Alamat"
          rules={[
            { required: true, message: 'Alamat harus diisi!' },
          ]}
        >
          <TextArea 
            rows={3} 
            placeholder="Masukkan alamat lengkap" 
          />
        </Form.Item>

        {initialValues && (
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CustomerModal;