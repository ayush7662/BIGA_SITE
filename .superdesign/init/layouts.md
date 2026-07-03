# Layout Components

This project has one primary shared layout component: `Navbar`, which is rendered across all authenticated pages.

## Navbar Layout

- **File Path**: [Navbar.jsx](file:///e:/BIGA/frontend/src/components/Navbar.jsx)
- **Description**: Renders the top navigation header with the application logo, dynamic search bar, navigation links based on user role (customer vs. shopkeeper), and a logout button.

### Source Code

```jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ search, setSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        B G A Y S H
      </Link>
      {user && (
        <>
          <input
            className="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="nav-links">
            <Link to="/home">Home</Link>
            {user.role === "customer" && (
              <>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/orders">Orders</Link>
              </>
            )}
            {user.role === "shopkeeper" && (
              <>
                <Link to="/manage-products">Manage Products</Link>
                <Link to="/shopkeeper-orders">Incoming Orders</Link>
              </>
            )}
            <button className="ghost-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
```
