import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

export default function UploadKonten() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [materiList, setMateriList] = useState([]);
  const [babList, setBabList] = useState([]);
  const [form, setForm] = useState({
    id_materi: "",
    id_bab: "",
    judul: "",
    deskripsi: "",
    tipe: "teks",
    content_text: "",
    file: null,
  });

  // redirect kalau bukan admin
  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/login");
  }, [user, navigate]);

  // fetch list materi
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/materi");
        setMateriList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMateri();
  }, []);

  // fetch bab saat materi dipilih
  useEffect(() => {
    if (!form.id_materi) return setBabList([]);

    const fetchBab = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/materi/${form.id_materi}/bab`
        );
        setBabList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBab();
  }, [form.id_materi]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id_bab) return alert("Pilih bab terlebih dahulu");

    const formData = new FormData();
    formData.append("id_bab", form.id_bab);
    formData.append("judul", form.judul);
    formData.append("deskripsi", form.deskripsi);
    formData.append("tipe", form.tipe);
    formData.append("created_by", user.id_user);

    if (form.tipe === "teks") formData.append("content_text", form.content_text);
    else formData.append("file", form.file);

    try {
      await axios.post("http://localhost:5000/api/konten", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Konten berhasil ditambahkan");
      navigate(`/materi/${form.id_materi}`);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan konten");
    }
  };

  return (
    <div className="materi-container">
      <h2 className="materi-title">Upload Konten</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Pilih Materi:
          <select name="id_materi" value={form.id_materi} onChange={handleChange} required>
            <option value="">-- Pilih Materi --</option>
            {materiList.map((m) => (
              <option key={m.id_materi} value={m.id_materi}>{m.judul}</option>
            ))}
          </select>
        </label>

        <label>
          Pilih Bab:
          <select name="id_bab" value={form.id_bab} onChange={handleChange} required>
            <option value="">-- Pilih Bab --</option>
            {babList.map((b) => (
              <option key={b.id_bab} value={b.id_bab}>{b.judul_bab}</option>
            ))}
          </select>
        </label>

        <label>
          Judul Konten:
          <input type="text" name="judul" value={form.judul} onChange={handleChange} required />
        </label>

        <label>
          Deskripsi Konten:
          <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} />
        </label>

        <label>
          Tipe Konten:
          <select name="tipe" value={form.tipe} onChange={handleChange}>
            <option value="teks">Teks</option>
            <option value="video">Video</option>
            <option value="gambar">Gambar</option>
          </select>
        </label>

        {form.tipe === "teks" ? (
          <label>
            Isi Teks:
            <textarea name="content_text" value={form.content_text} onChange={handleChange} required />
          </label>
        ) : (
          <label>
            Upload File:
            <input type="file" name="file" onChange={handleChange} required />
          </label>
        )}

        <button type="submit">Upload Konten</button>
      </form>
    </div>
  );
}
