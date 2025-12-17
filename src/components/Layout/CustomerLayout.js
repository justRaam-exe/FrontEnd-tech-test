import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Drawer } from 'antd';
import {
  HomeOutlined,
  ShoppingOutlined,
  TransactionOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './CustomerLayout.css';

const { Header, Content } = Layout;

const CustomerLayout = ({ children }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label:  'Beranda',
    },
    {
      key:  '/packages',
      icon: <ShoppingOutlined />,
      label: 'Paket Data',
    },
    {
      key: '/transactions',
      icon: <TransactionOutlined />,
      label:  'Transaksi Saya',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key:  'logout',
      icon:  <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setMobileMenuVisible(false);
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    }
  };

  return (
    <Layout className="customer-layout">
      <Header className="customer-header">
        <div className="customer-header-content">
          {/* Logo */}
          <div className="customer-logo" onClick={() => navigate('/dashboard')}>
            <ShoppingCartOutlined className="logo-icon" />
            <span className="logo-text">DataKom</span>
          </div>

          {/* Desktop Menu */}
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="desktop-menu"
          />

          {/* User Info & Mobile Toggle */}
          <div className="header-actions">
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
            >
              <div className="user-info">
                <Avatar icon={<UserOutlined />} className="user-avatar" />
                <span className="user-name">{user?.name}</span>
              </div>
            </Dropdown>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              className="mobile-menu-button"
            />
          </div>
        </div>
      </Header>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
        <div className="drawer-user-info">
          <Avatar icon={<UserOutlined />} size={48} />
          <div className="drawer-user-details">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              logout();
              navigate('/login');
            }}
            block
            style={{ marginTop: 16 }}
          >
            Logout
          </Button>
        </div>
      </Drawer>

      <Content className="customer-content">
        <div className="customer-content-wrapper">
          {children}
        </div>
      </Content>

      {/* Footer */}
      <footer className="customer-footer">
        <p>© 2025 DataKom E-Commerce.  All rights reserved.</p>
      </footer>
    </Layout>
  );
};

export default CustomerLayout;