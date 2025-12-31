import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Upload.css";
import "../styles/UploadMateri.css";

export default function UploadMateri() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
  });

  // redirect jika bukan admin
  if (!user || user.role !== "admin") navigate("/login");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/api/materi", {
        judul: form.judul,
        deskripsi: form.deskripsi,
        created_by: user.id_user,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Materi berhasil ditambahkan");
      navigate("/materi");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan materi");
    }
  };

  return (
  <div className="upload-container upload-materi">
    <h2 className="upload-title">Upload Materi Baru</h2>

    <form className="upload-form" onSubmit={handleSubmit}>
      <label>Judul Materi</label>
      <input
        type="text"
        name="judul"
        value={form.judul}
        onChange={handleChange}
        required
      />

      <label>Deskripsi Materi</label>
      <textarea
        name="deskripsi"
        value={form.deskripsi}
        onChange={handleChange}
      />

      <div className="upload-actions">
        <button type="submit" className="btn-primary">
          Tambah Materi
        </button>
      </div>
    </form>
  </div>
);

}
