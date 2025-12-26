import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import logoAjaBisindo from "../assets/logoAjaBisindo.png";

export default function Dashboard() {
  const navigate = useNavigate();

  /*useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
    */

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // hapus sesi
    navigate("/login");               // kembali ke login
  };

  return (
    <div className="dashboard-container">
      {/* header */}
      <div className="dashboard-header">
        <div className="header-left">
          <img src={logoAjaBisindo} alt="logo" className="header-logo" />

          <div className="header-title">
            <span className="bisindo">BISINDO</span>
            <span className="ku">ku</span>
          </div>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <h2>Selamat datang, {user?.username} 👋</h2>
        {/* MENU BOX */}
        <div className="dashboard-menu">
          <Link to="/materi" className="menu-card">
            <h3>Akses Materi</h3>
          </Link>

          <Link to="/video-call" className="menu-card">
            <h3>Video Call</h3>
          </Link>

          <Link to="/forum" className="menu-card">
            <h3>Forum Diskusi</h3>
          </Link>

          <Link to="/kamus" className="menu-card">
            <h3>Kamus</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
