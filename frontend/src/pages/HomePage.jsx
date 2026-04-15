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

  const loadProducts = async () => {
    const { data } = await api.get("/products", { params: { ...filters, search } });
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, [search]);

  const addToCart = async (productId) => {
    await api.post("/cart", { productId, quantity: 1 });
    toast.success("Added to cart");
  };

  const toggleWishlist = async (productId) => {
    await api.post("/wishlist/toggle", { productId });
    toast.success("Wishlist updated");
  };

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card filters">
        <input placeholder="Category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
        <input placeholder="Min price" type="number" onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
        <input placeholder="Max price" type="number" onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
        <input placeholder="Min rating" type="number" onChange={(e) => setFilters({ ...filters, minRating: e.target.value })} />
        <button className="btn secondary" onClick={loadProducts}>Apply Filters</button>
      </div>
      <div className="grid">
        {products.map((product) => (
          <div className="card product-card" key={product._id}>
            <img src={product.image || "https://via.placeholder.com/220x140"} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>Rs. {product.price}</p>
            <p>Rating: {product.ratingAverage?.toFixed(1) || 0}</p>
            <Link className="btn secondary" to={`/products/${product._id}`}>View</Link>
            {user.role === "customer" && (
              <div className="row">
                <button className="btn" onClick={() => addToCart(product._id)}>Add to Cart</button>
                <button className="btn secondary" onClick={() => toggleWishlist(product._id)}>Wishlist</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
