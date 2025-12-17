import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    const success = await login(values.username, values.password);
    setLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <Card className="login-card">
        <div className="login-header">
          <ShoppingOutlined className="login-icon" />
          <h1>DataKom E-Commerce</h1>
          <p>Sistem Pembelian Paket Data Internet</p>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Masukkan username!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
            />
          </Form.Item>

          <Form. Item
            name="password"
            rules={[
              { required: true, message: 'Masukkan password!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="login-demo-info">
          <h4>Demo Credentials: </h4>
          <div className="demo-credentials">
            <div>
              <strong>Admin:</strong>
              <div>Username: admin</div>
              <div>Password: admin123</div>
            </div>
            <div>
              <strong>Customer:</strong>
              <div>Username: customer1</div>
              <div>Password: customer123</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;