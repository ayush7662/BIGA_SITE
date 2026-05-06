import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ShopkeeperOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const load = async () => setOrders((await api.get("/orders/shopkeeper")).data);
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    toast.success("Order status updated");
    load();
  };

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card">
        <h2>Incoming Orders</h2>
        {orders.map((order) => (
          <div key={order._id} className="card">
            <p>Order #{order._id.slice(-6)} - {order.status} - {order.paymentStatus}</p>
            <div className="row">
              <button className="btn secondary" onClick={() => setStatus(order._id, "processing")}>Processing</button>
              <button className="btn secondary" onClick={() => setStatus(order._id, "shipped")}>Shipped</button>
              <button className="btn secondary" onClick={() => setStatus(order._id, "delivered")}>Delivered</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopkeeperOrdersPage;
