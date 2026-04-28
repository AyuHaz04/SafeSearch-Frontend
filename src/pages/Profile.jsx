import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    totalUploads: 0,
    totalShared: 0,
  });

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile/${user.email}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">
      
      <div className="profile-card">
        <h2>{user?.email}</h2>
        <p>Welcome to your dashboard</p>
      </div>

      <div className="stats-grid">
        
        <div className="stat-card">
          <h3>{data.totalUploads}</h3>
          <p>Documents Uploaded</p>
        </div>

        <div className="stat-card">
          <h3>{data.totalShared}</h3>
          <p>Shared With You</p>
        </div>

      </div>

    </div>
  );
}

export default Profile;