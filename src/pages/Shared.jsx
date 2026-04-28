import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "../styles/Shared.css";

function Shared() {
  const { user } = useContext(AuthContext);
  const [sharedWithMe, setSharedWithMe] = useState([]);
  const [sharedByMe, setSharedByMe] = useState([]);

  useEffect(() => {
    fetchShared();
  }, []);

  const fetchShared = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shared/${user.email}`
    );

    setSharedWithMe(res.data.sharedWithMe || []);
    setSharedByMe(res.data.sharedByMe || []);
  };

  const handleRemove = async (docId, email) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/remove-share/${docId}`,
        { email }
      );

      toast.success("Access removed");
      fetchShared();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="shared-container">

      {/* WITH ME */}
      <div className="shared-section">
        <h3>📥 Shared With You</h3>

        <div className="file-grid">
          {sharedWithMe.length === 0 ? (
            <p className="empty">No files shared with you</p>
          ) : (
            sharedWithMe.map((doc) => (
              <div className="file-card" key={doc._id}>
                <div className="file-header">
                  <span className="file-icon">
                    {getFileIcon(doc.filename)}
                  </span>
                  <span className="file-name">{doc.filename}</span>
                </div>

                <p className="file-info">
                  From: {doc.uploadedBy}
                </p>

                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${doc.filepath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-view"
                >
                  View
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BY ME */}
      <div className="shared-section">
        <h3>📤 Shared By You</h3>

        <div className="file-grid">
          {sharedByMe.length === 0 ? (
            <p className="empty">You haven’t shared anything</p>
          ) : (
            sharedByMe.map((doc) => (
              <div className="file-card" key={doc._id}>
                <h5>{doc.filename}</h5>

                {doc.sharedWith.map((email, i) => (
  <div key={i} className="shared-user">
    <span>{email}</span>

    <button
      onClick={() => handleRemove(doc._id, email)}
    >
      Remove
    </button>
  </div>
))}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default Shared;