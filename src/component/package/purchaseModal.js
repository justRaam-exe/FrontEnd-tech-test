import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Radio, Result, Button, Descriptions, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useAuth } from './page/src/contexts/AuthContext';
import { useCustomers } from './src/hooks/useCustomers';
import { useTransactions } from './src/hooks/useTransactions';

const { Option } = Select;

const PurchaseModal = ({ visible, onCancel, package: pkg }) => {
    const [form] = Form.useForm();
    const { user, isAdmin } = useAuth();
    const { customers } = useCustomers();
    const { createTransaction } = useTransactions();
    const [step, setStep] = useState(1);
    const [purchaseData, setPurchaseData] = useState(null);

    useEffect(() => {
        if (visible) {
            setStep(1);
            form.resetFields();
            if (! isAdmin && user?.customerId) {
                const customer = customers.find(c => c.id === user.customerId);
                if (customer) {
                    form.setFieldsValue({ customerId: customer.id });
                }
            }
        }
    }, [visible, isAdmin, user, customers, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const selectedCustomer = customers.find(c => c.id === values.customerId);
            const transactionData = {
                customerId: values.customerId,
                customerName: selectedCustomer.name,
                packageId: pkg.id,
                packageName: pkg.name,
                qouta: pkg.qouta,
                amount: pkg.price,
                paymentMethod: values.paymentMethod,
            };

            const success = await createTransaction(transactionData);
            if (success) {
                setPurchaseData({
                    ...transactionData,
                    customer: selectedCustomer,
                    package: pkg,
                });
                setStep(2);
            }
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    const handleClose = () => {
        setStep(1);
        form.resetFields();
        onCancel();
    }

    if (!pkg) return null;

    return (
        <Modal
            title={step === 1 ? 'Pembelian Paket Data' : 'Transaksi Berhasil'}
            open={visible}
            onCancel={handleClose}
            footer={
                step === 1 ? [
                    <Button key="cancel" onClick={handleClose}>
                        Batal
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Bayar Sekarang
                    </Button>,
                ] : [
                    <Button key="close" type="primary" onClick={handleClose}>
                        Tutup
                    </Button>,
                ]
            }
            width={600}
        >
            {step === 1 ?  (
                <>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Paket">{pkg.name}</Descriptions.Item>
                        <Descriptions. Item label="Kuota">{pkg.quota}</Descriptions.Item>
                        <Descriptions.Item label="Durasi">{pkg.duration}</Descriptions.Item>
                        <Descriptions.Item label="Harga">
                            <strong style={{ fontSize: '18px', color: '#1890ff' }}>
                                Rp {pkg.price.toLocaleString('id-ID')}
                            </strong>
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            paymentMethod: 'e-wallet',
                        }}
                    >
                        <Form.Item
                            name="customerId"
                            label="Customer"
                            rules={[{ required: true, message: 'Pilih customer!'}]}
                        >
                            <Select
                                placeholder="Pilih customer"
                                disabled={!isAdmin}
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {customers.map((customer) => (
                                    <Option key={customer.id} value={customer.id}>
                                        {customer.name} - {customer.email}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="paymentMethod"
                            label="Metode Pembayaran"
                            rules={[{ required: true }]}
                        >
                            <Radio.Group>
                                <Radio.Button value="e-wallet">E-Wallet</Radio.Button>
                                <Radio.Button value="transfer">Transfer Bank</Radio.Button>
                                <Radio.Button value="credit-card">Kartu Kredit</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <Result
                    status="success"
                    icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    title="Pembelian Berhasil!"
                    subTitle="Paket data Anda sudah aktif dan siap digunakan."
                    extra={
                        <Descriptions bordered column={1} size="small">
                            <Descriptions.Item label="Customer">
                                {purchaseData?.customer.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Paket">
                                {purchaseData?.packageName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Kuota">
                                {purchaseData?.quota}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Pembayaran">
                                <strong style={{ fontSize: '18px', color: '#52c41a' }}>
                                    Rp {purchaseData?.amount.toLocaleString('id-ID')}
                                </strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Metode Pembayaran">
                                {purchaseData?.paymentMethod === 'e-wallet' && 'E-Wallet'}
                                {purchaseData?.paymentMethod === 'transfer' && 'Transfer Bank'}
                                {purchaseData?.paymentMethod === 'credit-card' && 'Kartu Kredit'}
                                </Descriptions.Item>
                        </Descriptions>
                    }
                />
            )}
        </Modal>
    );
};

export default PurchaseModal;