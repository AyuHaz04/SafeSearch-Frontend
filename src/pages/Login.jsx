import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Auth.css";

const API_URL = "https://safesearch-xpj5.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      login(res.data.token, res.data.user);
      toast.success("Welcome back!");

      navigate("/profile"); // 🔥 go to profile after login
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtext">Login to your SafeShare account</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>

    </div>
  );
}

export default Login;