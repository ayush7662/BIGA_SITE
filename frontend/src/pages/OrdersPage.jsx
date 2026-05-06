import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => { api.get("/orders/customer").then(({ data }) => setOrders(data)); }, []);

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <div className="card">
        <h2>Order History</h2>
        {orders.map((order) => (
          <p key={order._id}>
            Order #{order._id.slice(-6)} - {order.status} - {order.paymentStatus} - Rs. {order.totalAmount}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
