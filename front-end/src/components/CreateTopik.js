import { useState } from "react";
import axios from "axios";
import "../styles/CreateTopik.css";

export default function CreateTopik({ refreshTopics }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ judul: "", deskripsi: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.judul.trim() || !form.deskripsi.trim()) {
      return alert("Judul dan deskripsi wajib diisi");
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/forum/topik",
        {
          judul: form.judul,
          deskripsi: form.deskripsi
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response:", res); // <-- ini penting untuk debugging
      alert("Topik berhasil dibuat");
      setForm({ judul: "", deskripsi: "" });
      refreshTopics(); // Refresh daftar topik
    } catch (err) {
  // Cek apakah error dari server (403, 401, 500) atau koneksi
  if (err.response) {
    console.error("Data Error:", err.response.data);
    console.error("Status Error:", err.response.status);
    alert(`Gagal: ${err.response.data.message || "Terjadi kesalahan server"}`);
  } else {
    console.error("Network Error:", err.message);
    alert("Gagal koneksi ke server");
  }
}
  };

  return (
    <form onSubmit={handleSubmit} className="create-topic-form">
      <h3>Buat Topik Baru</h3>
      <input
        type="text"
        name="judul"
        placeholder="Judul topik"
        value={form.judul}
        onChange={handleChange}
      />
      <textarea
        name="deskripsi"
        placeholder="Deskripsi topik"
        value={form.deskripsi}
        onChange={handleChange}
      />
      <button type="submit">Buat Topik</button>
    </form>
  );
}
