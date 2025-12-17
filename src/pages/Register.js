import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Steps } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, HomeOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './Register.css';

const { TextArea } = Input;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const checkUsernameExists = async (username) => {
    try {
      const response = await api.get('/users', {
        params: { username }
      });
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await api.get('/customers', {
        params: { email }
      });
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // Check if username already exists
      const usernameExists = await checkUsernameExists(values.username);
      if (usernameExists) {
        message.error('Username sudah digunakan! Silakan pilih username lain.');
        setLoading(false);
        return;
      }

      // Check if email already exists
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        message.error('Email sudah terdaftar! Silakan gunakan email lain.');
        setLoading(false);
        return;
      }

      // Step 1: Create customer data
      const customerResponse = await api.post('/customers', {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        registeredDate: new Date().toISOString().split('T')[0],
        status: 'active'
      });

      const customerId = customerResponse.data.id;

      // Step 2: Create user account
      await api.post('/users', {
        username: values.username,
        password: values.password,
        role: 'customer',
        name: values.name,
        email: values.email,
        phone: values.phone,
        customerId: customerId
      });

      setLoading(false);
      message.success('Registrasi berhasil! Silakan login dengan akun Anda.');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setLoading(false);
      message.error('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
      console.error('Registration error:', error);
    }
  };

  const steps = [
    {
      title: 'Akun',
      icon: <UserOutlined />,
    },
    {
      title:  'Data Diri',
      icon: <MailOutlined />,
    },
    {
      title: 'Selesai',
      icon: <ShoppingOutlined />,
    },
  ];

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <Card className="register-card">
        <div className="register-header">
          <ShoppingOutlined className="register-icon" />
          <h1>Daftar Akun Baru</h1>
          <p>Bergabunglah dan nikmati paket data terbaik</p>
        </div>

        <Steps current={currentStep} items={steps} style={{ marginBottom: 32 }} />
        
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          {/* Step 1: Account Info */}
          <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Username harus diisi!' },
                { min: 4, message: 'Username minimal 4 karakter!' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username hanya boleh huruf, angka, dan underscore!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Pilih username unik" 
              />
            </Form.Item>

            <Form. Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Password harus diisi!' },
                { min: 6, message:  'Password minimal 6 karakter!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Masukkan password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Konfirmasi Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Konfirmasi password harus diisi!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Password tidak cocok!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Ulangi password"
              />
            </Form.Item>

            <Button 
              type="primary" 
              onClick={() => {
                form.validateFields(['username', 'password', 'confirmPassword'])
                  .then(() => setCurrentStep(1))
                  .catch(() => {});
              }}
              block
              className="step-button"
            >
              Lanjut ke Data Diri
            </Button>
          </div>

          {/* Step 2: Personal Info */}
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <Form.Item
              name="name"
              label="Nama Lengkap"
              rules={[
                { required: true, message: 'Nama lengkap harus diisi!' },
                { min: 3, message: 'Nama minimal 3 karakter!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Masukkan nama lengkap" 
              />
            </Form. Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email harus diisi!' },
                { type:  'email', message: 'Format email tidak valid!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="contoh@email.com" 
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Nomor Telepon"
              rules={[
                { required: true, message: 'Nomor telepon harus diisi!' },
                { pattern: /^[0-9]{10,13}$/, message: 'Nomor telepon harus 10-13 digit!' }
              ]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="081234567890" 
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Alamat"
              rules={[
                { required: true, message: 'Alamat harus diisi!' },
                { min: 10, message: 'Alamat minimal 10 karakter!' }
              ]}
            >
              <TextArea 
                prefix={<HomeOutlined />}
                rows={3}
                placeholder="Masukkan alamat lengkap"
              />
            </Form.Item>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button 
                onClick={() => setCurrentStep(0)}
                block
                className="back-button"
              >
                Kembali
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                className="register-button"
              >
                Daftar Sekarang
              </Button>
            </div>
          </div>
        </Form>

        <div className="register-footer">
          <p>
            Sudah punya akun? {' '}
            <Link to="/login">Login di sini</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;