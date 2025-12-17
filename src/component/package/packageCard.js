import React from 'react';
import { Card, Button, Tag, Space } from 'antd';
import {
    ShoppingCartOutlined,
    CheckOutlined,
    WifiOutlined,
} from '@ant-design/icons';
import './packageCard.css';

const PackageCard = ({ package: pkg, onBuy }) => {
    const catagoryColors = {
        harian: 'blue',
        mingguan: 'green',
        bulanan: 'purple',
    };

    return (
        <Card
            className="package-card card-hover"
            hoverable
        >
            {/* package header */}
            <div className="package-card-header">
                <WifiOutlined className="package-icon" />
                <Tag color={catagoryColors[pkg.catagory]}>
                    {pkg.catagory.toUpperCase()}
                </Tag>
            </div>

            <h3 className="package-name">{pkg.name}</h3>
            <p className="package-description">{pkg.description}</p>

            {/* package details */}
            <div className="package-details">
                <div className="package-qouta">
                    <span className="qouta-value">{pkg.qouta}</span>
                    <span className="qouta-label">Kouta</span>
                </div>
                <div className="package-duration">
                    <span className="duration-value"></span>
                </div>
            </div>

            {/* package benefit */}
            <div className="package-benefits">
                <h4>Benefit: </h4>
                <Space direction="vertical" size="small">
                    {pkg.benefits.map((benefit, index) => (
                        <div key={index} className="benefit-item">
                            <CheckOutlined style={{ color: '#52c41a' }} />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </Space>
            </div>

            {/* package footer */}
            <div className="package-footer">
                <div className="package-price">
                    <span className="price-label">Harga</span>
                    <span className="price-value">
                        Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                </div>
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => onBuy(pkg)}
                    block
                    size="large"
                    className="buy-button"
                >
                    Beli Sekarang
                </Button>
            </div>
        </Card>
    );
};

export default PackageCard;