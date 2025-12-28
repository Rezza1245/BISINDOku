import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

export default function Bab() {
  const { id_materi } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [materi, setMateri] = useState(null);
  const [babList, setBabList] = useState([]);

 useEffect(() => {
    // ambil detail materi
    axios
      .get(`http://localhost:3000/api/materi/${id_materi}`)
      .then((res) => setMateri(res.data))
      .catch(console.error);

    // ambil daftar bab
    axios
      .get(`http://localhost:3000/api/materi/${id_materi}/bab`)
      .then((res) => setBabList(res.data))
      .catch(console.error);
  }, [id_materi]);

  if (!materi) return <p>Loading...</p>;

  return (
    <div className="materi-container">
      <h2 className="materi-title">{materi.judul}</h2>
      <p>{materi.deskripsi}</p>

      {user?.role === "admin" && (
        <button
          className="upload-btn"
          onClick={() => navigate(`/materi/${id_materi}/tambah-bab`)}
        >
          + Tambah Bab
        </button>
      )}
     <h2>Daftar Bab</h2>
      <div className="materi-grid">
        {babList.length > 0 ? (
          babList.map((bab) => (
            <div
              key={bab.id_bab}
              className="materi-card"
              onClick={() => navigate(`/bab/${bab.id_bab}`)}
            >
              <h3>{bab.judul_bab}</h3>
            </div>
          ))
        ) : (
          <p>Belum ada bab</p>
        )}
      </div>
    </div>
  );
}
