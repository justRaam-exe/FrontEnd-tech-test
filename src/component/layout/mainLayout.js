import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, theme } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  TransactionOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './mainLayout.css';

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Menu items
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key:  '/package',
      icon: <ShoppingOutlined />,
      label:  'Paket Data',
    },
    {
      key: '/transaction',
      icon: <TransactionOutlined />,
      label: 'Transaksi',
    },
    // Customer menu - only for admin
    ...(isAdmin
      ? [
          {
            key: '/customer',
            icon: <TeamOutlined />,
            label:  'Customers',
          },
        ]
      : []),
  ];

  // User dropdown menu
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label:  'Profile',
      onClick: () => {
        console.log('Profile clicked');
      },
    },
    {
      type: 'divider',
    },
    {
      key:  'logout',
      icon:  <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} className="main-sider">
        <div className="logo">
          <ShoppingOutlined style={{ fontSize: '24px', color: '#fff' }} />
          {! collapsed && <span style={{ marginLeft: '12px', color: '#fff', fontWeight: 'bold' }}>DataKom</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ marginRight: '8px' }}>{user?.name || 'User'}</span>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <Avatar
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;