import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateBab() {
  const { id_bab } = useParams();
  const navigate = useNavigate();
  const [judulBab, setJudulBab] = useState("");

  // fetch data Bab
  useEffect(() => {
    const fetchBab = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/bab/${id_bab}`);
        setJudulBab(res.data.judul_bab);
      } catch (err) {
        console.error("Gagal fetch bab:", err);
      }
    };
    fetchBab();
  }, [id_bab]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/bab/${id_bab}`,
        { judul_bab: judulBab },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bab berhasil diupdate");
      navigate(-1); // kembali ke halaman Bab
    } catch (err) {
      console.error("Gagal update bab:", err);
      alert("Gagal update bab");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Bab</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={judulBab}
          onChange={(e) => setJudulBab(e.target.value)}
          placeholder="Judul Bab"
        />
        <button type="submit">Update Bab</button>
      </form>
    </div>
  );
}
