import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const [search, setSearch] = useState("");
  useEffect(() => { api.get("/wishlist").then(({ data }) => setWishlist(data)); }, []);

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card">
        <h2>Wishlist</h2>
        {wishlist.products?.map((p) => <p key={p._id}>{p.name} - Rs. {p.price}</p>)}
      </div>
    </div>
  );
};

export default WishlistPage;
