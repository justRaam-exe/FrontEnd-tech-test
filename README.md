# 🛒 DataKom E-Commerce - Sistem Pembelian Paket Data Internet

Website e-commerce modern untuk pembelian paket data internet dengan fitur lengkap manajemen customer, katalog paket, dan transaksi.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12.0-1890ff)
![JSON Server](https://img.shields.io/badge/JSON%20Server-0.17.4-green)

## 🚀 Teknologi yang Digunakan

- **Frontend Framework**: React.js 18.2
- **UI Library**: Ant Design 5.12
- **Routing**: React Router DOM 6.20
- **HTTP Client**:  Axios 1.6
- **Mock Backend**: JSON Server 0.17
- **Date Library**: Day.js 1.11
- **Icons**: Ant Design Icons 5.2

## ✨ Fitur Utama

### 🔐 Authentication
- ✅ Login system dengan role-based access (Admin & Customer)
- ✅ Session management menggunakan localStorage
- ✅ Private routes dengan authorization
- ✅ Auto-redirect setelah login

### 👨‍💼 Admin Features
- **Dashboard**: 
  - Statistik lengkap (total revenue, transaksi, customer, success rate)
  - Tabel transaksi terbaru
  - Visual cards dengan animasi
  
- **Customer Management**:  
  - CRUD operations lengkap
  - Search & filter customer
  - Form validasi
  - Confirmation dialog untuk delete
  
- **Package Catalog**:  
  - Tampilan card-based yang menarik
  - Filter berdasarkan kategori
  - Sort berdasarkan harga/kuota
  
- **Transaction Management**: 
  - Monitor semua transaksi
  - Filter berdasarkan status dan tanggal
  - Export capability

### 👤 Customer Features
- **Dashboard**: 
  - Overview pembelian personal
  - Statistik pengeluaran
  - Status transaksi pending
  
- **Package Browsing**: 
  - Katalog paket dengan design menarik
  - Detail benefit setiap paket
  - Quick purchase
  
- **Transaction History**: 
  - Riwayat pembelian lengkap
  - Status tracking
  - Payment method info

### 🎨 UI/UX Features
- ✅ Responsive design (mobile-friendly)
- ✅ Modern & clean interface
- ✅ Smooth animations & transitions
- ✅ Loading states untuk async operations
- ✅ Error handling yang informatif
- ✅ Success/error notifications (Ant Design message)
- ✅ Confirmation dialogs untuk actions penting
- ✅ Gradient backgrounds & card shadows

## 🛠️ Instalasi & Setup

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm (v6 atau lebih tinggi)

### Langkah-langkah Instalasi

#### 1. Download/Clone Project
```bash
# Jika menggunakan Git
git clone <repository-url>
cd internet-package-ecommerce

# Atau extract file ZIP ke folder
```

#### 2. Install Dependencies
```bash
npm install
```

Ini akan menginstall semua dependencies yang diperlukan: 
- react
- react-dom
- react-router-dom
- antd
- axios
- dayjs
- @ant-design/icons
- json-server

#### 3. Verifikasi File db.json
Pastikan file `db.json` ada di **root folder** project (sejajar dengan package.json).

## 🚀 Cara Menjalankan Aplikasi

### ⚠️ PENTING:  Jalankan 2 Server Terpisah

Aplikasi ini membutuhkan **2 terminal/command prompt** yang berjalan bersamaan: 

#### Terminal 1: JSON Server (Backend Mock)
```bash
npm run server
```

**Output yang benar:**
```
\{^_^}/ hi! 

Loading db.json
Done

Resources
http://localhost:5000/users
http://localhost:5000/customers
http://localhost:5000/packages
http://localhost:5000/transactions

Home
http://localhost:5000
```

**Jangan tutup terminal ini! ** JSON Server harus tetap berjalan. 

#### Terminal 2: React App (Frontend)
```bash
npm start
```

**Output yang benar:**
```
Compiled successfully!

You can now view internet-package-ecommerce in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Aplikasi akan otomatis terbuka di browser:  **http://localhost:3000**

### 🔍 Cek Apakah Sudah Berjalan dengan Benar

1. **Cek JSON Server**: Buka http://localhost:3000/users di browser
   - Harus muncul data JSON users
   
2. **Cek React App**: Buka http://localhost:3000
   - Harus muncul halaman login

3. **Cek Console Browser**: 
   - Buka Developer Tools (F12)
   - Tidak boleh ada error merah

## 👤 Login Credentials

### Admin
```
Username: admin
Password: admin123
```

**Akses Admin:**
- ✅ Dashboard dengan full statistics
- ✅ Customer Management (CRUD)
- ✅ Package Catalog
- ✅ All Transactions

### Customer
```
Username: customer1
Password: customer123
```

**Akses Customer:**
- ✅ Personal Dashboard
- ✅ Package Catalog
- ✅ Own Transactions Only

## 📝 Fitur-Fitur yang Diimplementasikan

### ✅ Authentication & Authorization
- [x] Login form dengan validasi
- [x] Role-based access control (Admin/Customer)
- [x] Protected routes
- [x] Session persistence
- [x] Logout functionality

### ✅ Customer Management (Admin Only)
- [x] List customers dengan pagination
- [x] Add new customer
- [x] Edit customer
- [x] Delete customer (dengan confirmation)
- [x] Search customer
- [x] Form validation

### ✅ Package Catalog
- [x] Card-based display
- [x] Category filter (Harian/Mingguan/Bulanan)
- [x] Search functionality
- [x] Sort by price/quota
- [x] Responsive grid layout

### ✅ Transaction Management
- [x] Purchase flow
- [x] Transaction history
- [x] Status tracking (success/pending/failed)
- [x] Payment method selection
- [x] Date range filter
- [x] Statistics cards

### ✅ Dashboard
- [x] Admin:  Revenue, Transactions, Customers stats
- [x] Customer: Personal purchase stats
- [x] Recent transactions table
- [x] Visual cards dengan icons

### ✅ UI/UX
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] Success notifications
- [x] Smooth animations
- [x] Gradient backgrounds
- [x] Card hover effects

## 🎨 Design Highlights

- **Color Scheme**: 
  - Primary: #1890ff (Blue)
  - Success: #52c41a (Green)
  - Warning: #fa8c16 (Orange)
  - Error: #f5222d (Red)

- **Typography**:  System fonts dengan fallback

- **Animations**:
  - Fade-in untuk page transitions
  - Slide-up untuk modals
  - Hover effects pada cards
  - Pulse animation untuk icons

## 👨‍💻 Pengembangan

### Custom Hooks Pattern
Project ini menggunakan custom hooks untuk data management: 
- `useCustomers()` - Customer CRUD operations
- `usePackages()` - Package fetching
- `useTransactions()` - Transaction management
- `useAuth()` - Authentication state

### Context API
- `AuthContext` - Global authentication state
- Menghindari prop drilling
- Centralized auth logic

### API Service
- Axios instance dengan interceptors
- Centralized base URL configuration
- Error handling

---

**Dibuat dengan ❤️ menggunakan React & Ant Design**