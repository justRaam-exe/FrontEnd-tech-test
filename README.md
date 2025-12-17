# 🛒 DataKom E-Commerce - Sistem Pembelian Paket Data Internet

Website e-commerce modern untuk pembelian paket data internet dengan fitur lengkap manajemen customer, katalog paket, dan transaksi. 

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12.0-1890ff)
![JSON Server](https://img.shields.io/badge/JSON%20Server-0.17.4-green)

---

## 🎯 Highlight Fitur

✨ **Dual Layout System**
- 🖥️ **Admin**:  Sidebar navigation untuk dashboard profesional
- 📱 **Customer**: Top navbar modern & mobile-friendly

✨ **Role-Based Access Control**
- 👨‍💼 Admin: Full control (Dashboard, Customers, Packages, Transactions)
- 👤 Customer: Shopping-focused (Beranda, Paket Data, Transaksi Customer)

✨ **Modern UI/UX**
- 🎨 Gradient designs & smooth animations
- 📱 Fully responsive (Desktop, Tablet, Mobile)
- 🌈 Ant Design components
- ⚡ Fast & intuitive navigation

---

## 🚀 Teknologi yang Digunakan

| Kategori | Teknologi | Versi |
|----------|-----------|-------|
| **Frontend Framework** | React. js | 18.2.0 |
| **UI Library** | Ant Design | 5.12.0 |
| **Routing** | React Router DOM | 6.20.0 |
| **HTTP Client** | Axios | 1.6.2 |
| **Mock Backend** | JSON Server | 0.17.4 |
| **Date Library** | Day.js | 1.11.10 |
| **Icons** | Ant Design Icons | 5.2.6 |

---

## ✨ Fitur Lengkap

### 🔐 Authentication & Authorization
- ✅ Login system dengan validasi form
- ✅ Role-based access control (Admin/Customer)
- ✅ Protected routes dengan PrivateRoute component
- ✅ Session persistence menggunakan localStorage
- ✅ Auto-redirect setelah login berdasarkan role
- ✅ Logout functionality dengan confirmation

### 👨‍💼 Admin Features

#### **Admin Dashboard** (Sidebar Layout)
- 📊 **Statistik Lengkap**: 
  - Total Revenue dengan format Rupiah
  - Total Transactions count
  - Total Customers active
  - Success Rate percentage
- 📋 **Tabel Transaksi Terbaru** (5 terakhir)
- 🎨 **Visual Cards** dengan gradient & icons
- 📈 **Real-time Data** dari JSON Server

#### **Customer Management (CRUD)**
- ➕ **Create**:  Form tambah customer dengan validasi
  - Nama lengkap (min 3 karakter)
  - Email (format validation)
  - Nomor telepon (10-13 digit)
  - Alamat lengkap
- ✏️ **Update**: Edit customer data dengan modal
- 🗑️ **Delete**: Hapus customer dengan confirmation dialog
- 🔍 **Search**:  Cari customer by nama/email/telepon
- 📄 **Pagination**:  10 customers per page
- 📊 **Table View**: Sortable & scrollable table

#### **Package Catalog**
- 📦 Grid display dengan card design
- 🏷️ **Filter by Category**: Harian/Mingguan/Bulanan
- 🔍 **Search**:  Cari paket by nama/deskripsi
- ⬆️⬇️ **Sort**: Harga (Low-High, High-Low), Kuota
- 🎨 **Responsive Grid**: Auto-adjust columns

#### **Transaction Management**
- 📊 **Statistics Cards**:
  - Total Transaksi
  - Total Pendapatan
  - Transaksi Berhasil
- 📅 **Date Range Filter**
- 🏷️ **Status Filter**: Success/Pending/Failed
- 🔍 **Search**: Customer name atau paket name
- 💳 **Payment Method**: E-Wallet, Transfer, Kartu Kredit
- 📄 **Export-ready** table data

### 👤 Customer Features

#### **Customer Dashboard** (Navbar Layout)
- 🎉 **Welcome Section**:
  - Personalized greeting
  - CTA button "Beli Paket Sekarang"
  - Gradient background
- 📊 **Personal Statistics**:
  - Total Pembelian
  - Total Pengeluaran
  - Transaksi Pending
- 🔥 **Paket Populer**:
  - Top 3 best-selling packages
  - Badge ranking (#1, #2, #3)
  - Trophy icon untuk #1
  - Quick buy buttons
- 📜 **Riwayat Pembelian**:
  - 5 transaksi terakhir
  - Link "Lihat Semua" ke halaman transaksi
  - Empty state yang friendly

#### **Package Shopping**
- 🎁 **Beautiful Card Design**:
  - Package name & description
  - Kuota & durasi dengan gradient box
  - List benefits dengan checkmarks
  - Harga dengan format Rupiah
  - "Beli Sekarang" button
- 🔍 **Filter & Sort** (sama seperti admin)
- 🛒 **Purchase Flow**:
  1. Click "Beli Sekarang"
  2. Review paket details
  3. Pilih metode pembayaran
  4. Confirm purchase
  5. Success notification
- ✅ **Success Modal** dengan summary transaksi

#### **Transaction History**
- 📋 **Personal Transactions Only**
- 📊 **Statistics** (personal)
- 🔍 **Search & Filter**
- 📅 **Date Range** picker
- 🏷️ **Status Tags** dengan icons

### 🎨 UI/UX Excellence

#### **Design System**
- 🎨 **Color Palette**:
  - Primary: `#1890ff` (Blue)
  - Success: `#52c41a` (Green)
  - Warning: `#fa8c16` (Orange)
  - Error: `#f5222d` (Red)
  - Gradient: `#667eea` → `#764ba2` (Purple)
  
- ✍️ **Typography**:
  - System fonts dengan fallback
  - Responsive font sizes
  - Proper font weights

#### **Animations**
- ⚡ **Fade-in**:  Page transitions
- 🎭 **Slide-up**: Modals & drawers
- 🎯 **Hover Effects**: Cards elevate on hover
- 💫 **Pulse**:  Icon animations
- 🌊 **Float**: Background shapes

#### **Responsive Design**
- 📱 **Mobile** (< 576px):
  - Hamburger menu for customer
  - Collapsed sidebar for admin
  - Stacked cards
  - Full-width buttons
- 📱 **Tablet** (576px - 992px):
  - Adaptive grid layouts
  - Drawer menu for customer
  - Auto-collapsed sidebar for admin
- 🖥️ **Desktop** (> 992px):
  - Full navigation
  - Multi-column layouts
  - Optimal spacing

#### **Loading & Error States**
- ⏳ **Loading**:  Ant Design Spin components
- ❌ **Error**: Toast notifications (message API)
- ✅ **Success**: Green toast messages
- ⚠️ **Warning**: Orange confirmation dialogs
- 🗑️ **Confirm**: Delete confirmations (Popconfirm)

---

## 🛠️ Instalasi & Setup

### Prerequisites
Pastikan Anda sudah menginstall: 
- ✅ **Node.js** (v14.0.0 atau lebih tinggi)
- ✅ **npm** (v6.0.0 atau lebih tinggi)

Cek versi: 
```bash
node --version
npm --version
```

### Langkah-langkah Instalasi

#### 1️⃣ Clone/Download Project

**Opsi A: Menggunakan Git**
```bash
git clone <repository-url>
cd internet-package-ecommerce
```

**Opsi B: Download ZIP**
- Download ZIP file
- Extract ke folder pilihan Anda
- Buka terminal di folder tersebut

#### 2️⃣ Install Dependencies

```bash
npm install
```

**Proses ini akan menginstall:**
- react & react-dom
- react-router-dom
- antd (Ant Design)
- axios
- dayjs
- @ant-design/icons
- json-server
- react-scripts

**Output yang benar:**
```
added 1432 packages in 45s
```

#### 3️⃣ Verifikasi File Structure

Pastikan file-file penting ada: 
- ✅ `db.json` (di root folder)
- ✅ `package.json` (di root folder)
- ✅ `src/index.js` (entry point)
- ✅ `public/index.html` (HTML template)

---

## 🚀 Cara Menjalankan Aplikasi

### ⚠️ PENTING: Jalankan 2 Server Secara Bersamaan

Aplikasi ini membutuhkan **2 terminal/command prompt** yang berjalan bersamaan:

#### 📡 Terminal 1: JSON Server (Backend Mock API)

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

✅ **JSON Server berjalan di port 3001**
❗ **JANGAN TUTUP TERMINAL INI**

#### 💻 Terminal 2: React App (Frontend)

Buka terminal baru, lalu: 

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

✅ **React App berjalan di port 3000**
🌐 **Browser akan otomatis membuka** http://localhost:3000

---

## 🔍 Verifikasi Aplikasi Berjalan

### 1. Cek JSON Server

Buka di browser:
- http://localhost:5000/users → Harus muncul data JSON
- http://localhost:5000/customers → Harus muncul data JSON
- http://localhost:5000/packages → Harus muncul data JSON
- http://localhost:5000/transactions → Harus muncul data JSON

### 2. Cek React App

- http://localhost:3000 → Harus muncul halaman **Login**
- Tidak ada error di console browser (F12)

### 3. Cek Network Requests

1.  Buka Developer Tools (F12)
2. Tab "Network"
3. Login dengan credentials
4. Harus ada request ke `http://localhost:5000/users`
5. Status:  **200 OK**

---

## 👤 Login Credentials

### 🔑 Admin Account

```
Username: admin
Password: admin123
```

**Akses Admin:**
- ✅ **Layout**:  Sidebar navigation
- ✅ **Dashboard**: Full statistics (revenue, customers, success rate)
- ✅ **Customer Management**:  CRUD operations
- ✅ **Package Catalog**: View & manage packages
- ✅ **All Transactions**: Monitor semua transaksi user

**Halaman yang bisa diakses:**
- `/dashboard` - Admin Dashboard
- `/customers` - Customer Management
- `/packages` - Package Catalog
- `/transactions` - All Transactions

---

### 🛍️ Customer Account 1

```
Username: customer1
Password: customer123
```

**Data Customer:**
- Nama: Budi Santoso
- Email: budi@example.com
- Phone: 081234567891

**Akses Customer:**
- ✅ **Layout**: Top navbar (modern & mobile-friendly)
- ✅ **Beranda**: Dashboard dengan paket populer
- ✅ **Paket Data**: Browse & beli paket
- ✅ **Transaksi Saya**: Riwayat pembelian sendiri

**Halaman yang bisa diakses:**
- `/dashboard` - Customer Dashboard
- `/packages` - Package Shopping
- `/transactions` - Personal Transactions Only

---

### 🛍️ Customer Account 2

```
Username: customer2
Password: customer123
```

**Data Customer:**
- Nama:  Siti Rahayu
- Email: siti@example.com
- Phone: 081234567892

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot GET /users"

**Penyebab**:  JSON Server tidak berjalan

**Solusi**:
```bash
# Terminal terpisah
npm run server
```

---

### ❌ Error: "Network Error" di Console

**Penyebab**:  
- JSON Server tidak aktif
- Port 5000 digunakan aplikasi lain

**Solusi**:
1. Cek terminal JSON Server
2. Restart:  `Ctrl+C` → `npm run server`
3. Cek port: 
```bash
# Windows
netstat -ano | findstr : 5000

# Mac/Linux
lsof -i : 3001
```

---


### ❌ Error: "Module not found"

**Penyebab**: Dependencies tidak terinstall

**Solusi**:
```bash
# Hapus node_modules
rm -rf node_modules

# Install ulang
npm install
```

---

### ❌ Login Gagal Terus

**Penyebab**: 
- JSON Server tidak jalan
- Credentials salah
- CORS issue

**Solusi**: 
1. Cek http://localhost:3001/users di browser
2. Pastikan ada data user
3. Gunakan credentials yang benar
4. Cek console browser (F12) untuk error

---

### ❌ Halaman Blank Setelah Login

**Penyebab**: 
- Routing error
- Component error

**Solusi**: 
1. Buka console browser (F12)
2. Lihat error message
3. Refresh page (Ctrl+R)
4. Clear localStorage: 
```javascript
// Di console browser
localStorage.clear()
```

---

### ❌ Customer Bisa Akses /customers

**Penyebab**: PrivateRoute tidak bekerja

**Solusi**:
- Seharusnya auto-redirect ke `/dashboard`
- Jika tidak, cek `src/components/Auth/PrivateRoute.js`
- Pastikan `adminOnly` prop terisi

---

## 📚 Dokumentasi API (JSON Server)

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Users
```http
GET    /users              # Get all users
GET    /users/:id          # Get user by ID
GET    /users? username=admin&password=admin123  # Login
POST   /users              # Create user
PUT    /users/:id          # Update user
DELETE /users/:id          # Delete user
```

#### Customers
```http
GET    /customers          # Get all customers
GET    /customers/:id      # Get customer by ID
POST   /customers          # Create customer
PUT    /customers/:id      # Update customer
DELETE /customers/:id      # Delete customer
```

#### Packages
```http
GET    /packages           # Get all packages
GET    /packages/:id       # Get package by ID
GET    /packages?category=harian  # Filter by category
POST   /packages           # Create package
PUT    /packages/:id       # Update package
DELETE /packages/:id       # Delete package
```

#### Transactions
```http
GET    /transactions       # Get all transactions
GET    /transactions/:id   # Get transaction by ID
GET    /transactions?customerId=1  # Filter by customer
POST   /transactions       # Create transaction
PUT    /transactions/:id   # Update transaction
DELETE /transactions/:id   # Delete transaction
```

### Pagination
```http
GET /customers?_page=1&_limit=10
```

### Sorting
```http
GET /transactions?_sort=purchaseDate&_order=desc
```

### Full-text Search
```http
GET /customers?q=budi
```

---

**Dibuat dengan ❤️ menggunakan React & Ant Design**

**Happy Coding!  🚀**

