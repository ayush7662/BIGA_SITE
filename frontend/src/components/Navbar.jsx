import { Link, NavLink, useNavigate } from "react-router-dom";
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
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <svg 
              style={{ position: "absolute", left: "12px", width: "16px", height: "16px", color: "#94a3b8", pointerEvents: "none" }} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "36px" }}
            />
          </div>
          <div className="nav-links">
            <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
              Home
            </NavLink>
            {user.role === "customer" && (
              <>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
                  Cart
                </NavLink>
                <NavLink to="/wishlist" className={({ isActive }) => isActive ? "active" : ""}>
                  Wishlist
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>
                  Orders
                </NavLink>
              </>
            )}
            {user.role === "shopkeeper" && (
              <>
                <NavLink to="/manage-products" className={({ isActive }) => isActive ? "active" : ""}>
                  Manage Products
                </NavLink>
                <NavLink to="/shopkeeper-orders" className={({ isActive }) => isActive ? "active" : ""}>
                  Incoming Orders
                </NavLink>
              </>
            )}
            <button className="btn secondary" style={{ padding: "8px 14px", fontSize: "13px" }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
