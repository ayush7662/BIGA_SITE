# Routes and Pages Mapping

The application uses `react-router-dom` (v7) for routing. Private routes are protected by a `<PrivateRoute>` guard checking for auth tokens and user roles.

## Page Router Configurations

All routes are declared in [App.jsx](file:///e:/BIGA/frontend/src/App.jsx):

| URL Path | Component Path | Layout | Route Guard | Description |
|---|---|---|---|---|
| `/` | [LandingPage.jsx](file:///e:/BIGA/frontend/src/pages/LandingPage.jsx) | None | Public | Landing/welcome page with Call to Action |
| `/signup` | [SignupPage.jsx](file:///e:/BIGA/frontend/src/pages/SignupPage.jsx) | None | Public (Auth) | Account registration (Customer or Shopkeeper) |
| `/login` | [LoginPage.jsx](file:///e:/BIGA/frontend/src/pages/LoginPage.jsx) | None | Public (Auth) | Login page with social connection |
| `/reset` | [ResetPasswordPage.jsx](file:///e:/BIGA/frontend/src/pages/ResetPasswordPage.jsx) | None | Public (Auth) | Password reset confirmation page |
| `/home` | [HomePage.jsx](file:///e:/BIGA/frontend/src/pages/HomePage.jsx) | `Navbar` | Private | Homepage displaying product catalog with filters |
| `/products/:id` | [ProductPage.jsx](file:///e:/BIGA/frontend/src/pages/ProductPage.jsx) | `Navbar` | Private | Detailed product page with reviews and rating |
| `/cart` | [CartPage.jsx](file:///e:/BIGA/frontend/src/pages/CartPage.jsx) | `Navbar` | Private (Customer) | Cart checkout and summary |
| `/orders` | [OrdersPage.jsx](file:///e:/BIGA/frontend/src/pages/OrdersPage.jsx) | `Navbar` | Private (Customer) | List of customer order history |
| `/wishlist` | [WishlistPage.jsx](file:///e:/BIGA/frontend/src/pages/WishlistPage.jsx) | `Navbar` | Private (Customer) | User wishlist items |
| `/manage-products` | [ManageProductsPage.jsx](file:///e:/BIGA/frontend/src/pages/ManageProductsPage.jsx) | `Navbar` | Private (Shopkeeper) | Inventory management for shopkeeper |
| `/shopkeeper-orders` | [ShopkeeperOrdersPage.jsx](file:///e:/BIGA/frontend/src/pages/ShopkeeperOrdersPage.jsx) | `Navbar` | Private (Shopkeeper) | Shopkeeper incoming order processing |

### Private Route Guard (`PrivateRoute.jsx`)
Protects pages by checking user role.
- **File Path**: [PrivateRoute.jsx](file:///e:/BIGA/frontend/src/components/PrivateRoute.jsx)
