import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [search, setSearch] = useState("");
  const load = async () => setCart((await api.get("/cart")).data);
  useEffect(() => { load(); }, []);

  const checkout = async () => {
    await api.post("/orders");
    toast.success("Order placed");
    load();
  };

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card">
        <h2>Cart</h2>
        {cart.items?.map((item) => <p key={item.product._id}>{item.product.name} x {item.quantity}</p>)}
        <button className="btn" onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
