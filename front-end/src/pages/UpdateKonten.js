import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

export default function UpdateKonten() {
  const { id_konten } = useParams();
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [tipe, setTipe] = useState("text");
  const [contentText, setContentText] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchKonten = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/konten/${id_konten}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const konten = res.data;
        setJudul(konten.judul);
        setTipe(konten.tipe);
        setContentText(konten.content_text || "");
      } catch (err) {
        console.error("Gagal ambil data konten:", err);
      }
    };
    fetchKonten();
  }, [id_konten]);

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    // Gunakan FormData supaya bisa handle file upload
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tipe", tipe);

    if (tipe === "text" || tipe === "quiz") {
      formData.append("content_text", contentText);
    }

    if ((tipe === "image" || tipe === "video") && file) {
      formData.append("file", file); // file asli dikirim ke backend
    }

    await axios.put(`http://localhost:3000/api/konten/${id_konten}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Konten berhasil diupdate");
    navigate(-1);
  } catch (err) {
    console.error("Gagal update konten:", err);
    alert("Update konten gagal. Cek console untuk detail error.");
  }
};


  return (
    <div className="update-container">
      <h2>Update Konten</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul Konten"
        />

        <select value={tipe} onChange={(e) => setTipe(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="quis">Link / Kuis</option>
        </select>

        {/* Text atau Quiz */}
        {(tipe === "text" || tipe === "quis") && (
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            placeholder={tipe === "text" ? "Isi konten" : "Link Quiz"}
          />
        )}

        {/* Image atau Video */}
        {tipe === "image" || tipe === "video" ? (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        ) : null}

        <button type="submit">Update Konten</button>
      </form>
    </div>
  );
}
