import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/authContext';  // ← FIX: context (tunggal), lowercase
import PrivateRoute from './component/auth/privateRoute';  // ← FIX: component (tunggal), lowercase
import Login from './page/login';  // ← FIX: page (tunggal), lowercase
import Dashboard from './page/dashboard';  // ← FIX: page (tunggal), lowercase
import Customer from './page/customer';  // ← FIX: page (tunggal), Customer (tunggal)
import Package from './page/package';  // ← FIX: page (tunggal), Package (tunggal)
import Transaction from './page/transaction';  // ← FIX: page (tunggal), Transaction (tunggal)
import './App.css';

function App() {
  console.log('App: Rendering.. .');
  console.log('PrivateRoute:', PrivateRoute);  // ← Debug
  console.log('Login:', Login);  // ← Debug
  console.log('Dashboard:', Dashboard);  // ← Debug
  console.log('Customer:', Customer);  // ← Debug
  console.log('Package:', Package);  // ← Debug
  console.log('Transaction:', Transaction);  // ← Debug

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute adminOnly>
                  <Customer />
                </PrivateRoute>
              }
            />
            <Route
              path="/packages"
              element={
                <PrivateRoute>
                  <Package />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute>
                  <Transaction />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ConfigProvider } from 'antd';
// import { AuthProvider } from './context/authContext';
// import './App.css';

// // Test component
// const TestPage = () => (
//   <div style={{ 
//     padding: '50px', 
//     fontSize: '24px',
//     backgroundColor: '#e6f7ff',
//     minHeight: '100vh'
//   }}>
//     <h1 style={{ color: '#1890ff' }}>✅ AuthProvider Works!</h1>
//     <p>Time: {new Date().toLocaleTimeString()}</p>
//     <p>If you see this, AuthProvider is working!</p>
//   </div>
// );

// function App() {
//   console.log('App: Rendering.. .');
  
//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#1890ff',
//           borderRadius: 8,
//         },
//       }}
//     >
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="*" element={<TestPage />} />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </ConfigProvider>
//   );
// }

// export default App;