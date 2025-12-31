import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Update.css"; // path sesuai project


export default function UpdateMateri() {
  const { id_materi } = useParams();
  const navigate = useNavigate();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState(null);

  // fetch data materi awal
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/materi/${id_materi}`);
        setJudul(res.data.judul);
        setDeskripsi(res.data.deskripsi);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMateri();
  }, [id_materi]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    if (file) formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/materi/${id_materi}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Materi berhasil diupdate");
      navigate("/materi");
    } catch (err) {
      console.error(err);
      alert("Gagal update materi");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Materi</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul Materi"
        />
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi Materi"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Update Materi</button>
      </form>
    </div>
  );
}
