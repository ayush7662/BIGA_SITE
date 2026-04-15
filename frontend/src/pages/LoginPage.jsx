import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user, data.token);
      toast.success("Login successful");
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-overlay" />
      <form className="card form auth-card" onSubmit={submit}>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue shopping on BIG A.</p>
        <input placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn" type="submit">Sign In</button>
        <div className="social-links">
          <a href="https://accounts.google.com/" target="_blank" rel="noreferrer">Continue with Google</a>
          <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer">Continue with Facebook</a>
          <a href="https://appleid.apple.com/sign-in" target="_blank" rel="noreferrer">Continue with Apple</a>
        </div>
        <p>New user? <Link to="/signup">Create account</Link></p>
      </form>
    </section>
  );
};

export default LoginPage;
