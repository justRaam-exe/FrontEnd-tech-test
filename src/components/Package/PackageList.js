import React, { useState } from 'react';
import { Row, Col, Input, Select, Empty, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { usePackages } from '../../hooks/usePackages';
import PackageCard from './PackageCard';
import PurchaseModal from './PurchaseModal';
import './Package.css';

const { Option } = Select;

const PackageList = () => {
  const { packages, loading } = usePackages();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);

  const handleBuy = (pkg) => {
    setSelectedPackage(pkg);
    setPurchaseModalVisible(true);
  };

  let filteredPackages = packages.filter(pkg => {
    const matchSearch = pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
                       pkg.description.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = categoryFilter === 'all' || pkg.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  // Sorting
  filteredPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'quota': 
        return parseInt(b.quota) - parseInt(a.quota);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding:  '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="package-container fade-in">
      <div className="package-header">
        <div>
          <h1 className="page-title">Katalog Paket Data</h1>
          <p className="page-subtitle">Pilih paket data terbaik untuk Anda</p>
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Input
            placeholder="Cari paket..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            size="large"
            allowClear
          />
        </Col>
        <Col xs={12} md={6}>
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            size="large"
            style={{ width: '100%' }}
          >
            <Option value="all">Semua Kategori</Option>
            <Option value="harian">Harian</Option>
            <Option value="mingguan">Mingguan</Option>
            <Option value="bulanan">Bulanan</Option>
          </Select>
        </Col>
        <Col xs={12} md={6}>
          <Select
            value={sortBy}
            onChange={setSortBy}
            size="large"
            style={{ width: '100%' }}
          >
            <Option value="name">Urutkan:  Nama</Option>
            <Option value="price-low">Harga:  Rendah - Tinggi</Option>
            <Option value="price-high">Harga: Tinggi - Rendah</Option>
            <Option value="quota">Kuota Terbesar</Option>
          </Select>
        </Col>
      </Row>

      {filteredPackages.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredPackages.map((pkg) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={pkg.id}>
              <PackageCard package={pkg} onBuy={handleBuy} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="Tidak ada paket yang ditemukan" />
      )}

      <PurchaseModal
        visible={purchaseModalVisible}
        onCancel={() => setPurchaseModalVisible(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default PackageList;