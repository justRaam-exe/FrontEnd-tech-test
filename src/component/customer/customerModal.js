import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const CustomerModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = form.useForm();

    useEffect(() => {
        if (visible) {
            if (initialValues) {
                form.setFieldsvalue(initialValues);
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
                        { required: true, message: 'Please input the customer name!' },
                        { min: 3, message: 'Name must be at least 3 characters long' },
                    ]}
                >
                    <Input placeholder="Masukkan nama lengkap" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input the email!' },
                        { type: 'email', message: 'Please enter a valid email!' },                   
                    ]}
                >
                    <Input placeholder="ex: person123@gmail.com" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Nomor Telepon"
                    rules={[
                        { required: true, message: 'Please input the phone number!' },
                        { pattern: /^[0-9]{10,13}$/, message: 'Please enter a valid phone number (10-13 digits)' },
                    ]}
                >
                    <Input placeholder="ex: 081234567890" />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Alamat"
                    rules={[
                        { required: true, message: 'Please input the address!' },
                    ]}
                >
                    <TextArea
                        rows={4}
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