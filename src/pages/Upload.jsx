import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "../styles/Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", user.email);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData);
      toast.success("File uploaded!");
      setFile(null);
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="upload-container">
  <div className="upload-card">
    <h2>Upload Document</h2>

    <form onSubmit={handleUpload}>
      <label className="upload-box">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span>
          {file ? file.name : "Click to select file"}
        </span>
      </label>

      <button type="submit">Upload</button>
    </form>
  </div>
</div>
  );
}

export default Upload;