import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ManageProductsPage = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", category: "" });

  const load = async () => setProducts((await api.get("/products")).data);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    await api.post("/products", payload);
    toast.success("Product added");
    setForm({ name: "", description: "", price: "", stock: "", category: "" });
    load();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    toast.success("Product deleted");
    load();
  };

  return (
    <div className="page">
      <Navbar search={search} setSearch={setSearch} />
      <form className="card form" onSubmit={submit}>
        <h2>Add Product</h2>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <button className="btn">Add</button>
      </form>
      <div className="grid">
        {products.map((p) => (
          <div key={p._id} className="card">
            <h3>{p.name}</h3>
            <p>Stock: {p.stock}</p>
            <button className="btn secondary" onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProductsPage;
