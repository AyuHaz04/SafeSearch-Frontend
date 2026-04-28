import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">SafeShare</h2>

      <nav>
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          👤 Profile
        </Link>

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/upload"
          className={location.pathname === "/upload" ? "active" : ""}
        >
          ⬆️ Upload
        </Link>

        <Link
          to="/shared"
          className={location.pathname === "/shared" ? "active" : ""}
        >
          👥 Shared
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;