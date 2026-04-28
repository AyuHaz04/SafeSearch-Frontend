import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* LOGO */}
      <div className="home-logo">
        <h1>SafeShare</h1>
      </div>

      {/* HERO */}
      <div className="hero">
        <h2>Securely Store & Share Your Documents</h2>
        <p>
          Upload, manage, and share your files with ease and security.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-secondary">Create Account</Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="feature-card">
          <h3>📂 Upload</h3>
          <p>Store your documents safely</p>
        </div>

        <div className="feature-card">
          <h3>🔗 Share</h3>
          <p>Share files with other users</p>
        </div>

        <div className="feature-card">
          <h3>🔐 Secure</h3>
          <p>Your data is protected</p>
        </div>
      </div>

    </div>
  );
}

export default Home;