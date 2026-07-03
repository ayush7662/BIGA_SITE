import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "", minRating: "" });
  const [products, setProducts] = useState([]);

  const categories = ["All Products", "Electronics", "Footwear", "Accessories", "Home & Kitchen"];

  const loadProducts = async (overrideFilters = filters) => {
    try {
      const { data } = await api.get("/products", { params: { ...overrideFilters, search } });
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  const handleCategorySelect = (cat) => {
    const categoryValue = cat === "All Products" ? "" : cat;
    const updatedFilters = { ...filters, category: categoryValue };
    setFilters(updatedFilters);
    loadProducts(updatedFilters);
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId, quantity: 1 });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      await api.post("/wishlist/toggle", { productId });
      toast.success("Wishlist updated");
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      
      {/* Hero Heading Section */}
      <div style={{ marginBottom: "32px", marginTop: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "-0.03em", margin: "0 0 12px 0", fontFamily: "'Cabinet Grotesk', sans-serif", color: "#fff" }}>
          Curated Collection
        </h1>
        <p style={{ color: "#94a3b8", maxWidth: "42rem", margin: 0, lineHeight: "1.6", fontSize: "16px" }}>
          Explore our society's exclusive marketplace featuring premium electronics, footwear, accessories, and home essentials curated just for you.
        </p>
      </div>

      {/* Category Chips Selection Row */}
      <div className="chips-container" style={{ marginBottom: "24px" }}>
        {categories.map((cat) => {
          const isActive = (cat === "All Products" && filters.category === "") || (cat !== "All Products" && filters.category === cat);
          return (
            <button
              key={cat}
              className={isActive ? "chip-active" : "chip-inactive"}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Custom Refined Filters Panel */}
      <div className="card filters" style={{ marginBottom: "40px", padding: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Min Price</label>
          <input 
            placeholder="Min" 
            type="number" 
            value={filters.minPrice} 
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} 
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Max Price</label>
          <input 
            placeholder="Max" 
            type="number" 
            value={filters.maxPrice} 
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} 
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Min Rating</label>
          <select 
            value={filters.minRating} 
            onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
          >
            <option value="">Any Rating</option>
            <option value="4.0">4.0+</option>
            <option value="4.5">4.5+</option>
          </select>
        </div>
        <div style={{ alignSelf: "flex-end" }}>
          <button className="btn" style={{ width: "100%", padding: "10px 24px" }} onClick={() => loadProducts()}>
            Refine Search
          </button>
        </div>
      </div>

      {/* Premium Product Grid */}
      <div className="grid">
        {products.map((product) => (
          <div className="premium-card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }} key={product._id}>
            <div style={{ position: "relative" }}>
              <img src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"} alt={product.name} />
              {user.role === "customer" && (
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                  <button 
                    onClick={() => toggleWishlist(product._id)}
                    style={{ 
                      background: "rgba(15, 23, 42, 0.6)", 
                      backdropFilter: "blur(8px)", 
                      border: "1px solid rgba(255, 255, 255, 0.1)", 
                      color: "#fff", 
                      padding: "8px", 
                      borderRadius: "50%", 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#ef4444"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)"}
                  >
                    <svg style={{ width: "16px", height: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", color: "#60a5fa", background: "rgba(96, 165, 250, 0.1)", padding: "4px 8px", borderRadius: "4px" }}>
                  {product.category}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#facc15", fontSize: "14px" }}>
                  <svg style={{ width: "14px", height: "14px" }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={{ fontWeight: "700", color: "#f8fafc" }}>{product.ratingAverage?.toFixed(1) || "0.0"}</span>
                </div>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 8px 0", lineHeight: "1.3" }}>
                {product.name}
              </h3>
              <p style={{ fontSize: "20px", fontWeight: "900", color: "#fff", margin: "0 0 16px 0" }}>
                Rs. {product.price}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "auto" }}>
                <Link className="btn secondary" style={{ fontSize: "13px", padding: "10px 0" }} to={`/products/${product._id}`}>
                  Details
                </Link>
                {user.role === "customer" && (
                  <button className="btn" style={{ fontSize: "13px", padding: "10px 0" }} onClick={() => addToCart(product._id)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
