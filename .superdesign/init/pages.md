# Page Dependency Trees

This file outlines the file dependencies for each page in the application. When designing or reproducing any page, pass all files in its dependency tree as context.

## 1. Landing Page (`/`)
- **Page Component**: [LandingPage.jsx](file:///e:/BIGA/frontend/src/pages/LandingPage.jsx)
- **Dependencies**:
  - [LandingPage.jsx](file:///e:/BIGA/frontend/src/pages/LandingPage.jsx)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 2. Signup Page (`/signup`)
- **Page Component**: [SignupPage.jsx](file:///e:/BIGA/frontend/src/pages/SignupPage.jsx)
- **Dependencies**:
  - [SignupPage.jsx](file:///e:/BIGA/frontend/src/pages/SignupPage.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 3. Login Page (`/login`)
- **Page Component**: [LoginPage.jsx](file:///e:/BIGA/frontend/src/pages/LoginPage.jsx)
- **Dependencies**:
  - [LoginPage.jsx](file:///e:/BIGA/frontend/src/pages/LoginPage.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [AuthContext.jsx](file:///e:/BIGA/frontend/src/context/AuthContext.jsx)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 4. Reset Password Page (`/reset`)
- **Page Component**: [ResetPasswordPage.jsx](file:///e:/BIGA/frontend/src/pages/ResetPasswordPage.jsx)
- **Dependencies**:
  - [ResetPasswordPage.jsx](file:///e:/BIGA/frontend/src/pages/ResetPasswordPage.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 5. Home Page (`/home`)
- **Page Component**: [HomePage.jsx](file:///e:/BIGA/frontend/src/pages/HomePage.jsx)
- **Dependencies**:
  - [HomePage.jsx](file:///e:/BIGA/frontend/src/pages/HomePage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [AuthContext.jsx](file:///e:/BIGA/frontend/src/context/AuthContext.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 6. Product Page (`/products/:id`)
- **Page Component**: [ProductPage.jsx](file:///e:/BIGA/frontend/src/pages/ProductPage.jsx)
- **Dependencies**:
  - [ProductPage.jsx](file:///e:/BIGA/frontend/src/pages/ProductPage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [AuthContext.jsx](file:///e:/BIGA/frontend/src/context/AuthContext.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 7. Cart Page (`/cart`)
- **Page Component**: [CartPage.jsx](file:///e:/BIGA/frontend/src/pages/CartPage.jsx)
- **Dependencies**:
  - [CartPage.jsx](file:///e:/BIGA/frontend/src/pages/CartPage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 8. Wishlist Page (`/wishlist`)
- **Page Component**: [WishlistPage.jsx](file:///e:/BIGA/frontend/src/pages/WishlistPage.jsx)
- **Dependencies**:
  - [WishlistPage.jsx](file:///e:/BIGA/frontend/src/pages/WishlistPage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 9. Orders Page (`/orders`)
- **Page Component**: [OrdersPage.jsx](file:///e:/BIGA/frontend/src/pages/OrdersPage.jsx)
- **Dependencies**:
  - [OrdersPage.jsx](file:///e:/BIGA/frontend/src/pages/OrdersPage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 10. Manage Products Page (`/manage-products`)
- **Page Component**: [ManageProductsPage.jsx](file:///e:/BIGA/frontend/src/pages/ManageProductsPage.jsx)
- **Dependencies**:
  - [ManageProductsPage.jsx](file:///e:/BIGA/frontend/src/pages/ManageProductsPage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)

## 11. Shopkeeper Orders Page (`/shopkeeper-orders`)
- **Page Component**: [ShopkeeperOrdersPage.jsx](file:///e:/BIGA/frontend/src/pages/ShopkeeperOrdersPage.jsx)
- **Dependencies**:
  - [ShopkeeperOrdersPage.jsx](file:///e:/BIGA/frontend/src/pages/ShopkeeperOrdersPage.jsx)
  - [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
  - [api.js](file:///e:/BIGA/frontend/src/services/api.js)
  - [index.css](file:///e:/BIGA/frontend/src/index.css)
