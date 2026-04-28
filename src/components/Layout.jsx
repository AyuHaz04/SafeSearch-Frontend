import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext";
import "../styles/Dashboard.css";

function Layout({ children }) {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // 🔥 CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <div className="topbar">

          <div className="user-section">
            <div className="avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <span className="username">
              {user?.email.split("@")[0]}
            </span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;