# 🔥 FLAMES Restaurant - Full Stack Web Application

A complete restaurant management system with customer-facing menu, shopping cart, and a fully functional admin dashboard. Built with React.js frontend, Node.js/Express backend, and MySQL database.



## 🚀 **New in Phase 2**
- ✅ **Admin Dashboard** with full restaurant management
- ✅ **User Authentication** (Login/Register with roles)
- ✅ **Complete CRUD Operations** (Create, Read, Update, Delete)
- ✅ **MySQL Database Integration** for persistent data
- ✅ **Role-Based Access Control** (Admin vs Customer)

## 📸 **Screenshots**

### Home Page
![Home](https://github.com/user-attachments/assets/73eb9085-e40b-4ddd-8030-97f1e4db7243)

### Menu with Search
![Menu](https://github.com/user-attachments/assets/ff00dffa-6e89-4b19-9383-6dd66e47ba7d)

### Admin Dashboard
*Admin panel for managing dishes and orders*

### Login Page
*User authentication with role-based access*

### Order Management
*View and manage customer orders*

## ✨ **Key Features**

### **For Customers:**
- Browse menu with search functionality
- Add items to shopping cart
- View dish details
- Place orders with customer information
- Responsive design for all devices

### **For Administrators:**
- **Dashboard** with restaurant overview
- **Manage Dishes** (Add, Edit, Delete menu items)
- **Manage Orders** (View and delete customer orders)
- **User Management** (Admin/Customer roles)
- **Secure Authentication** with role-based access

## 🛠️ **Technology Stack**

### **Frontend:**
- React.js with Hooks
- React Router DOM for navigation
- Custom CSS with responsive design
- Context API for state management (simplified)

### **Backend:**
- Node.js with Express.js
- RESTful API architecture
- MySQL database
- CORS for cross-origin requests

### **Database:**
- MySQL with tables: `dishes`, `orders`, `users`
- Relationships between customer orders and dishes
- User authentication with roles

## 📁 **Project Structure**

FLAMES-Resto/
├── frontend/ # React Application
│ ├── public/
│ │ ├── assets/ # Image files
│ │ └── index.html
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ │ ├── Home.js
│ │ │ ├── Menu.js
│ │ │ ├── Admin.js
│ │ │ ├── Login.js
│ │ │ ├── Register.js
│ │ │ ├── ManageDishes.js
│ │ │ └── ManageOrders.js
│ │ ├── App.js # Main app with routing
│ │ └── index.js # Entry point
│ └── package.json
│
├── backend/ # Node.js Server
│ ├── server.js # Express server with all routes
│ ├── package.json
│ └── README.md
│
└── database/ # MySQL Database
└── schema.sql # Database schema

## 🚦 **Installation & Setup**

### **Prerequisites:**
- Node.js (v14 or higher)
- MySQL Server
- Git

### **1. Clone the Repository:**
```bash
git clone https://github.com/asmaa691/flames-resto-final.git
cd flames-resto-final
## 2. Database Setup:
-- Run these commands in MySQL
CREATE DATABASE flames_resto;

USE flames_resto;

-- Dishes table
CREATE TABLE dishes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(500)
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample admin user
INSERT INTO users (username, password, email, role) 
VALUES ('admin', 'admin123', 'admin@flames.com', 'admin');

-- Insert sample customer user
INSERT INTO users (username, password, email, role)
VALUES ('customer1', 'password123', 'customer@example.com', 'customer');

## 3. Backend Setup:
cd backend
npm install

Configure database connection in server.js if needed:
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",  
  database: "flames_resto"
});

Start backend server:
node server.js
# Server runs on http://localhost:5000

## 4. Frontend Setup:
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000

 ##Test Accounts
Admin Access:
Username: admin

Password: admin123

Access: Full admin dashboard, manage dishes/orders
Customer Access:
Username: customer1

Password: password123

Access: Browse menu, place orders

# CRUD Operations
Dishes Management:
CREATE: Add new dishes to menu

READ: Browse all dishes with search

UPDATE: Edit existing dishes

DELETE: Remove dishes from menu

Orders Management:
CREATE: Customers place new orders

READ: View all orders (admin only)

DELETE: Remove completed orders

Users Management:
CREATE: Register new users

READ/AUTHENTICATE: Login with credentials

Role-based access control

 # API Endpoints
Dishes:
GET /dishes - Get all dishes

GET /dishes/:id - Get single dish

POST /dishes - Add new dish (admin)

PUT /dishes/:id - Update dish (admin)

DELETE /dishes/:id - Delete dish (admin)

Orders:
GET /orders - Get all orders (admin)

POST /orders - Create new order

DELETE /orders/:id - Delete order (admin)

Authentication:
POST /api/register - Register new user

POST /api/login - User login

Role-based access in frontend routing

## 📚 Project Evolution

**Phase 1**: Basic React restaurant website  
→ [View Phase 1](https://github.com/asmaa691/Restaurant.git)  


**Phase 2**: Full-stack with admin dashboard & database  
→ [viewPhase 2](https://asmaa691.github.io/flames-resto-phase2)