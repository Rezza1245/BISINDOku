import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Upload.css";
import "../styles/UploadBab.css";

export default function UploadBab() {
  const { id_materi } = useParams();
  const navigate = useNavigate();
  const [judulBab, setJudulBab] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!judulBab) return alert("Judul Bab wajib diisi");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/materi/${id_materi}/bab`,
        { judul_bab: judulBab },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bab berhasil ditambahkan");
      navigate(-1); // kembali ke halaman Bab
    } catch (err) {
      console.error("Gagal tambah bab:", err);
      alert("Gagal tambah bab");
    }
  };

  return (
  <div className="upload-container upload-bab">
    <h2 className="upload-title">Tambah Bab</h2>

    <form className="upload-form" onSubmit={handleUpload}>
      <label>Judul Bab</label>
      <input
        type="text"
        value={judulBab}
        onChange={(e) => setJudulBab(e.target.value)}
        required
      />

      <div className="upload-actions">
        <button type="submit" className="btn-primary">
          Simpan Bab
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate(-1)}
        >
          Batal
        </button>
      </div>
    </form>
  </div>
);

}
