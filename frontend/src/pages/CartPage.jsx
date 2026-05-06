import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [showAddress, setShowAddress] = useState(false);
  const load = async () => setCart((await api.get("/cart")).data);
  useEffect(() => { load(); }, []);

  const [paymentMethod, setPaymentMethod] = useState("cod");
const checkout = async () => {
    const deliveryAddress = address;
    if (!deliveryAddress.address) {
      toast.error("Please fill delivery address");
      setShowAddress(true);
      return;
    }
    try {
      if (paymentMethod === "stripe") {
        const { data } = await api.post("/orders/checkout", { deliveryAddress });
        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error("Invalid Stripe session");
        }
      } else {
        await api.post("/orders", { paymentMethod: "cod", deliveryAddress });
        toast.success("Order placed with COD!");
        load();
        setAddress({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Checkout failed. Check login/cart/address.");
    }
  };

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card">
        <h2>Shopping Cart (Total: Rs. {cart.items?.reduce((sum, item) => sum + (item.product?.price * item.quantity || 0), 0)})</h2>
        {cart.items?.map((item) => (
          <div key={item.product._id} className="card row">
            <img src={item.product?.image} alt={item.product?.name} style={{width: '60px'}} />
            <div>
              <h4>{item.product?.name}</h4>
              <p>Rs. {item.product?.price} x {item.quantity} = Rs. {item.product?.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <button className="btn secondary mb-2" onClick={() => setShowAddress(!showAddress)}>
          {showAddress ? 'Hide' : 'Add'} Delivery Address
        </button>
        {showAddress && (
          <div className="card mb-2">
            <input placeholder="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} className="form-control mb-1" />
            <input placeholder="Phone" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} className="form-control mb-1" />
            <input placeholder="Address" value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} className="form-control mb-1" />
            <input placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="form-control mb-1" />
            <input placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} className="form-control mb-1" />
            <input placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} className="form-control mb-1" />
          </div>
        )}
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="form-control mb-2">
          <option value="cod">Cash on Delivery</option>
          <option value="stripe">Pay with Stripe/Card</option>
        </select>
        <button className="btn primary w-full" onClick={checkout}>Place Order</button>
      </div>
    </div>
  );
};

export default CartPage;
