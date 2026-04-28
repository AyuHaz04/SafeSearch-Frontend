import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  // wait until auth state is checked
  if (loading) {
    return <p>Loading...</p>;
  }

  // if not logged in → redirect
  if (!token) {
    return <Navigate to="/login" />;
  }

  // if logged in → allow access
  return children;
}

export default ProtectedRoute;