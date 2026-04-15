import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-overlay" />
      <form className="card form auth-card" onSubmit={submit}>
        <h2>Create Your BIG A Account</h2>
        <p className="auth-subtitle">Join as customer or shopkeeper in your society marketplace.</p>
        <input placeholder="Full Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email Address" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="customer">Customer</option>
          <option value="shopkeeper">Shopkeeper</option>
        </select>
        <button className="btn" type="submit">Sign Up</button>
        <div className="social-links">
          <a href="https://accounts.google.com/" target="_blank" rel="noreferrer">Signup with Google</a>
          <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer">Signup with Facebook</a>
          <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noreferrer">Signup with Apple</a>
        </div>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </section>
  );
};

export default SignupPage;
