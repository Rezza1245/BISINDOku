import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

export default function Konten() {
  const { id_bab } = useParams();
  const [kontenList, setKontenList] = useState([]);

  useEffect(() => {
    const fetchKonten = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bab/${id_bab}/konten`
        );
        setKontenList(res.data);
      } catch (err) {
        console.error("Gagal fetch konten:", err);
      }
    };
    fetchKonten();
  }, [id_bab]);

  const renderKonten = (konten) => {
    switch (konten.tipe) {
      case "video":
        return (
          <video width="100%" controls>
            <source src={`http://localhost:5000/${konten.file_path}`} type="video/mp4" />
            Browsermu tidak mendukung video.
          </video>
        );
      case "gambar":
        return (
          <img
            src={`http://localhost:5000/${konten.file_path}`}
            alt={konten.judul}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        );
      case "teks":
        return <p>{konten.content_text}</p>;
      default:
        return <p>Jenis konten tidak diketahui</p>;
    }
  };

  return (
    <div className="materi-container">
      <h2 className="materi-title">Konten Bab</h2>
      <div className="materi-grid">
        {kontenList.length > 0 ? (
          kontenList.map((konten) => (
            <div key={konten.id_konten} className="materi-card">
              <h3>{konten.judul}</h3>
              {renderKonten(konten)}
            </div>
          ))
        ) : (
          <p>Belum ada konten tersedia</p>
        )}
      </div>
    </div>
  );
}
