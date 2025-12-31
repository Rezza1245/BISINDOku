import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // ambil token login

  if (!token) {
    return <Navigate to="/login" replace />; // lempar ke login kalau tidak ada token
  }

  return children; // kalau ada token, render anak
}
