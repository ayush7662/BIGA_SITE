import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="center-page">
    <h1>BIG A Society Marketplace</h1>
    <p>Amazon/Myntra style shopping experience for your society community.</p>
    <div className="row">
      <Link className="btn" to="/signup">
        Create Account
      </Link>
      <Link className="btn secondary" to="/login">
        Login
      </Link>
    </div>
  </div>
);

export default LandingPage;
