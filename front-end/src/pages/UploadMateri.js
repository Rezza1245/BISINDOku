import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

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
      await axios.post("http://localhost:3000/api/materi", {
        judul: form.judul,
        deskripsi: form.deskripsi,
        created_by: user.id_user,
      });
      alert("Materi berhasil ditambahkan");
      navigate("/materi");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan materi");
    }
  };

  return (
    <div className="materi-container">
      <h2 className="materi-title">Upload Materi Baru</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Judul Materi:
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Deskripsi Materi:
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Tambah Materi</button>
      </form>
    </div>
  );
}
