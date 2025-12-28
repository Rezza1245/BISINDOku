import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";
import mikro from "../assets/mikro.png";
import globe from "../assets/globe.png";
import potion from "../assets/potion.png";

export default function Materi() {
  const navigate = useNavigate();
  const [materiList, setMateriList] = useState([]);
  useEffect(() => {
  axios
    .get("http://localhost:3000/api/materi")
    .then((res) => setMateriList(res.data))
    .catch((err) => console.error(err));
}, []);
  const user = JSON.parse(localStorage.getItem("user"));

  // fetch materi dari backend
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/materi"); // sesuaikan port
        setMateriList(res.data);
      } catch (err) {
        console.error("Gagal fetch materi:", err);
      }
    };
    fetchMateri();
  }, []);

  // helper untuk gambar default sesuai judul
  const getImage = (judul) => {
    switch (judul.toLowerCase()) {
      case "kimia":
        return mikro;
      case "geografi":
        return globe;
      case "biologi":
        return potion;
      default:
        return mikro; // fallback
    }
  };

  return (
    <div className="materi-container">
      <h2 className="materi-title">Daftar Materi</h2>

      {user?.role === "admin" && (
        <button
          className="upload-btn"
          onClick={() => navigate("/upload-materi")}
        >
          + Upload Materi
        </button>
      )}

      <div className="materi-grid">
        {materiList.length > 0 ? (
          materiList.map((materi) => (
            <div
              key={materi.id_materi}
              className="materi-card"
              onClick={() => navigate(`/materi/${materi.id_materi}`)}
            >
              <img
                src={getImage(materi.judul)}
                alt={materi.judul}
                className="materi-image"
              />
              <h3>{materi.judul}</h3>
            </div>
          ))
        ) : (
          <p>Belum ada materi tersedia</p>
        )}
      </div>
    </div>
  );
}
