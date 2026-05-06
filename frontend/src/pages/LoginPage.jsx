import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

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

  const forgotSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot", { email: forgotEmail });
      toast.success("Reset link sent to backend console - copy URL and visit /reset?token=...");
      setShowForgot(false);
      setForgotEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    }
  };

  if (showForgot) {
    return (
      <section className="auth-page" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8f9fa'}}>
        <form className="card auth-card" style={{maxWidth: '400px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} onSubmit={forgotSubmit}>
          <h3>Forgot Password?</h3>
          <p>Enter your email to get reset instructions.</p>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={forgotEmail} 
            onChange={(e) => setForgotEmail(e.target.value)}
            style={{width: '100%', padding: '0.75rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px'}}
            required 
          />
          <div style={{display: 'flex', gap: '1rem'}}>
            <button type="button" onClick={() => setShowForgot(false)} style={{flex: 1, padding: '0.75rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Cancel</button>
            <button type="submit" style={{flex: 1, padding: '0.75rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Send Reset Link</button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-overlay" />
      <form className="card form auth-card" onSubmit={submit}>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue shopping on BIG A.</p>
        <input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn w-full" type="submit">Sign In</button>
        <p className="text-center mt-2 mb-4">
          <button type="button" onClick={() => setShowForgot(true)} style={{background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Forgot Password?</button>
        </p>
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
