import React from 'react';
import { useAuth } from '../context/authContext';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();

    return (
        <div style={{ 
            padding: '50px',
            backgroundColor: '#f0f0f0',
            minHeight: '100vh'
        }}>
            <h1>✅ Dashboard Works!</h1>
            <div style={{ marginTop: '30px', fontSize: '18px' }}>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <p><strong>Is Admin:</strong> {isAdmin ?  'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default Dashboard;  // ← PASTIKAN ADA INI! 