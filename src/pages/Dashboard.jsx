import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "../styles/Dashboard.css";

function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");
  const [shareOpen, setShareOpen] = useState(null);
  const [shareEmail, setShareEmail] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchDocs();
  }, [user]);

  const fetchDocs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/documents/${user.email}`
    );
    setDocs(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/delete/${id}`,
        { data: { email: user.email } }
      );

      setDocs(docs.filter((doc) => doc._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleShare = async (id) => {
    if (!shareEmail) {
      toast.error("Enter email");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/share/${id}`,
        { email: shareEmail }
      );

      toast.success("Shared!");
      setShareOpen(null);
      setShareEmail("");
    } catch {
      toast.error("Share failed");
    }
  };

  const getFileIcon = (name) => {
  const ext = name.split(".").pop().toLowerCase();

  if (ext === "pdf") return "📄";
  if (ext === "doc" || ext === "docx") return "📝";
  if (ext === "xls" || ext === "xlsx") return "📊";
  if (ext === "png" || ext === "jpg") return "🖼️";

  return "📁";
};

  const filteredDocs = docs.filter((doc) =>
    doc.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>Your Documents</h2>

      <input
        type="text"
        placeholder="Search documents..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="file-grid">
        {filteredDocs.map((doc) => (
          <div className="file-card" key={doc._id}>
            <div className="file-header">
            <span className="file-icon">
              {getFileIcon(doc.filename)}
            </span>
            <span className="file-name">{doc.filename}</span>
          </div>

            <div className="file-actions">
              <a
                href={`${import.meta.env.VITE_API_URL}/uploads/${doc.filepath}`}
                target="_blank"
                rel="noreferrer"
                className="btn-view"
              >
                View
              </a>

              <button
                className="btn-share"
                onClick={() =>
                  setShareOpen(
                    shareOpen === doc._id ? null : doc._id
                  )
                }
              >
                Share
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(doc._id)}
              >
                Delete
              </button>
            </div>

           {shareOpen === doc._id && (
              <div className="share-box">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />

                <button
                  className="btn-send"
                  onClick={() => handleShare(doc._id)}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;