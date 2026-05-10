# 🛒 BIG A Marketplace (MERN Stack)

A full-stack eCommerce marketplace application built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It supports authentication, role-based access (customer & shopkeeper), product management, cart system, wishlist, and order handling.

---


##  Live URL: https://biga-site.vercel.app/



## 🚀 Features

### 👤 Authentication & Security
- 🔐 User Signup & Login
- 🔁 Password Reset functionality
- 🛡️ Protected Routes (Role-based access control)

### 🛍️ Customer Features
- 🛒 Add to Cart / Remove from Cart
- ❤️ Wishlist system
- 📦 Place and track orders
- 🔍 Browse products

### 🏪 Shopkeeper Features
- ➕ Add / Manage Products
- 📊 View received orders
- 🏷️ Product management dashboard

### ⚡ System Features
- 🌐 RESTful API architecture
- ☁️ Cloudinary image support
- 🔄 Global error handling
- 📱 Responsive frontend UI
- 🔐 Secure JWT-based authentication

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API / State Management
- Protected Routes (Role-based)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Upload)
- CORS & dotenv

---


BIG-A-Marketplace/
│
├── backend/
│ ├── config/
│ │ ├── db.js
│ │ └── cloudinary.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── productRoutes.js
│ │ ├── cartRoutes.js
│ │ ├── orderRoutes.js
│ │ └── wishlistRoutes.js
│ │
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── productController.js
│ │ ├── cartController.js
│ │ ├── orderController.js
│ │ └── wishlistController.js
│ │
│ ├── models/
│ │ ├── userModel.js
│ │ ├── productModel.js
│ │ ├── cartModel.js
│ │ ├── orderModel.js
│ │ └── wishlistModel.js
│ │
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── errorMiddleware.js
│ │
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── pages/
│ │ ├── LandingPage.jsx
│ │ ├── SignupPage.jsx
│ │ ├── LoginPage.jsx
│ │ ├── HomePage.jsx
│ │ ├── ProductPage.jsx
│ │ ├── CartPage.jsx
│ │ ├── OrdersPage.jsx
│ │ ├── WishlistPage.jsx
│ │ ├── ManageProductsPage.jsx
│ │ └── ShopkeeperOrdersPage.jsx
│ │
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ └── PrivateRoute.jsx
│ │
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── ProductContext.jsx
│ │
│ ├── App.jsx
│ └── main.jsx
│
└── README.md



---

## ⚙️ Backend Setup

### 1. Install dependencies

```bash
```
cd backend
npm install

```
```
## 2. Create .env file

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- CLOUDINARY_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret


## 3. Start server

node server.js

## Backend runs on:

http://localhost:5000

## 💻 Frontend Setup


1. Install dependencies

   cd frontend
npm install

2. Start frontend

   npm run dev

   Frontend runs on:

   http://localhost:5173

   🔐 API Routes
   
## Auth Routes
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/reset
 - Product Routes
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
  
## Cart Routes

- GET /api/cart
- POST /api/cart
- DELETE /api/cart/:id
- Order Routes
- GET /api/orders
- POST /api/orders
- Wishlist Routes
- GET /api/wishlist
- POST /api/wishlist
- DELETE /api/wishlist/:id
  
## 🛡️ Role-Based Access


## 👤 Customer

- Home
- Products
- Cart
- Orders
- Wishlist
  
## 🏪 Shopkeeper

- Manage Products
- Shop Orders
- 
👨‍💻 Author

Ayush Raj

📌 Future Improvements
🔔 Real-time notifications
💳 Payment gateway integration
📦 Order tracking system
📊 Admin dashboard
🚀 Deployment (Vercel + Render)
