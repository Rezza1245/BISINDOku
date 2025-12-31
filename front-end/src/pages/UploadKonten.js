import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Upload.css";
import "../styles/UploadKonten.css";

export default function UploadKonten() {
  const navigate = useNavigate();
  const { id_bab } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [materiList, setMateriList] = useState([]);
  const [babList, setBabList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const [form, setForm] = useState({
    id_materi: "",
    id_bab: "",
    judul: "",
    deskripsi: "",
    tipe: "quis",
    content_text: "",
    file: null,
  });

  // set id_bab dari URL
  useEffect(() => {
    if (id_bab) {
      setForm((prev) => ({ ...prev, id_bab }));
    }
  }, [id_bab]);

  // proteksi admin
  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/login");
  }, [user, navigate]);

  // fetch materi
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/materi")
      .then((res) => setMateriList(res.data))
      .catch(console.error);
  }, []);

  // fetch bab by materi
  useEffect(() => {
    if (!form.id_materi) {
      setBabList([]);
      return;
    }

    axios
      .get(`http://localhost:3000/api/materi/${form.id_materi}/bab`)
      .then((res) => setBabList(res.data))
      .catch(console.error);
  }, [form.id_materi]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const file = files[0];
      if (!file) return;

      const allowedTypes = {
        gambar: ["image/jpeg", "image/png"],
        video: ["video/mp4"],
      };
      // 1. Validasi ukuran (10 MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Ukuran file maksimal 10 MB");
        e.target.value = null;
        return;
      }


      if (
        allowedTypes[form.tipe] &&
        !allowedTypes[form.tipe].includes(file.type)
      ) {
        alert("Tipe file tidak sesuai dengan tipe konten");
        e.target.value = null;
        return;
      }

      // 3. File valid → simpan
      setForm({ ...form, file });
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
      return;
    }

    // input biasa
    setForm({ ...form, [name]: value });
  };


  useEffect(() => {
    setForm((prev) => ({ ...prev, file: null }));
    setFileName("");
  }, [form.tipe]);

  // =========================
  // SUBMIT (INI SAJA LOGIC FE)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id_bab) return alert("Pilih bab terlebih dahulu");

    const formData = new FormData();
    formData.append("id_bab", form.id_bab);
    formData.append("judul", form.judul);
    formData.append("deskripsi", form.deskripsi);
    formData.append("tipe", form.tipe);
    formData.append("created_by", user.id_user);

    // VALIDASI WAJIB
    if (!form.judul || !form.deskripsi) {
      return alert("Judul dan deskripsi wajib diisi");
    }

    // Konten tipe teks
    if (form.tipe === "teks") {
      if (!form.content_text.trim()) return alert("Konten teks tidak boleh kosong");
      formData.append("content_text", form.content_text);
    }

    // Konten tipe quis
    if (form.tipe === "quis") {
      if (!form.content_text.trim()) return alert("Link kuis wajib diisi");
      if (!form.content_text.startsWith("http")) return alert("Link kuis harus berupa URL yang valid");
      formData.append("content_text", form.content_text);
    }

    // Konten tipe file (gambar/video)
    if (["gambar", "video"].includes(form.tipe)) {
      if (!form.file) return alert("File wajib diupload sesuai tipe konten");
      formData.append("file", form.file); // HARUS SAMA DENGAN multer.single("file")
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/konten/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Hanya Authorization
            // jangan set Content-Type manual, biarkan axios otomatis
          },
        }
      );
      alert(res.data.message);
      // reset form atau refresh konten jika perlu
    } catch (err) {
      console.error(err);
      alert("Upload konten gagal");
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
              <option key={m.id_materi} value={m.id_materi}>
                {m.judul}
              </option>
            ))}
          </select>
        </label>

        <label>
          Pilih Bab:
          <select name="id_bab" value={form.id_bab} onChange={handleChange} required>
            <option value="">-- Pilih Bab --</option>
            {babList.map((b) => (
              <option key={b.id_bab} value={b.id_bab}>
                {b.judul_bab}
              </option>
            ))}
          </select>
        </label>

        <label>
          Judul Konten:
          <input type="text" name="judul" value={form.judul} onChange={handleChange} required />
        </label>

        <label>
          Deskripsi:
          <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} />
        </label>

        <label>
          Tipe Konten:
          <select name="tipe" value={form.tipe} onChange={handleChange}>
            <option value="teks">Teks</option>
            <option value="gambar">Gambar</option>
            <option value="video">Video</option>
            <option value="quis">Link / Kuis</option>
          </select>
        </label>

        {(form.tipe === "teks" || form.tipe === "quis") && (
          <label>
            {form.tipe === "quis" ? "Link Kuis" : "Isi Teks"}:
            <textarea
              name="content_text"
              value={form.content_text}
              onChange={handleChange}
              required
            />
          </label>
        )}

        {form.tipe === "gambar" && (
          <label>
            Upload Gambar:
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>
        )}

        {form.tipe === "video" && (
          <label>
            Upload Video:
            <input
              type="file"
              name="file"
              accept="video/*"
              onChange={handleChange}
              required
            />
          </label>
        )}

        {previewUrl && form.tipe === "gambar" && (
          <div className="preview-box">
            <p>Preview Gambar:</p>
            <img src={previewUrl} alt="preview" style={{ maxWidth: "100%" }} />
          </div>
        )}

        {previewUrl && form.tipe === "video" && (
          <div className="preview-box">
            <p>Preview Video:</p>
            <video src={previewUrl} controls width="100%" />
          </div>
        )}


        {fileName && (
          <p style={{ fontSize: "12px", color: "#555" }}>
            File dipilih: <strong>{fileName}</strong>
          </p>
        )}


        <button type="submit">Upload Konten</button>
      </form>
    </div>
  );
}
