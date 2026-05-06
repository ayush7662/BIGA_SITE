import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import ShopkeeperOrdersPage from "./pages/ShopkeeperOrdersPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/reset" element={<ResetPasswordPage />} />
    <Route
      path="/home"
      element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      }
    />
    <Route
      path="/products/:id"
      element={
        <PrivateRoute>
          <ProductPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <PrivateRoute role="customer">
          <CartPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/orders"
      element={
        <PrivateRoute role="customer">
          <OrdersPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/wishlist"
      element={
        <PrivateRoute role="customer">
          <WishlistPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/manage-products"
      element={
        <PrivateRoute role="shopkeeper">
          <ManageProductsPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/shopkeeper-orders"
      element={
        <PrivateRoute role="shopkeeper">
          <ShopkeeperOrdersPage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default App;
