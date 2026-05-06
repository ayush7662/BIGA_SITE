import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset/${token}`, { password });
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="card mx-auto max-w-md mt-10">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <form onSubmit={submit}>
          <input 
            type="password" 
            placeholder="New Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            required 
            minLength={6}
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control mb-3"
            required 
          />
          <button className="btn primary w-full" disabled={loading || password !== confirmPassword}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <p className="text-center mt-4">
          <a href="/login" className="link">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
