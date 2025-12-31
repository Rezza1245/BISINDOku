const db = require("../config/db");
const path = require("path");
const upload = require("../middleware/uploadMiddleware"); // multer

// ===== upload konten =====
exports.uploadKonten = (req, res) => {
  // panggil multer untuk menangani file upload
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload file gagal", error: err.message });
    }

    // fallback aman jika req.body undefined (FormData)
    const body = req.body || {};

    const id_bab = body.id_bab;
    const judul = body.judul;
    const deskripsi = body.deskripsi || "";
    const tipe = body.tipe; // teks, quis, gambar, video
    const created_by = body.created_by;
    let contentText = null;
    let filePath = null;

    // validasi wajib
    if (!id_bab || !judul || !tipe || !created_by) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    // mapping berdasarkan tipe konten
    if (tipe === "teks" || tipe === "quis") {
      if (!body.content_text) {
        return res.status(400).json({ message: tipe === "teks" ? "Isi teks wajib diisi" : "Link kuis wajib diisi" });
      }
      contentText = body.content_text;
    }

    if (tipe === "gambar" || tipe === "video") {
      if (!req.file) {
        return res.status(400).json({ message: "File wajib diupload" });
      }
      // gunakan path relatif untuk FE
      filePath = `/uploads/${req.file.filename}`;
    }

    // simpan ke DB
    const query = `
      INSERT INTO konten
      (id_bab, judul, deskripsi, tipe, content_text, file_path, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [id_bab, judul, deskripsi, tipe, contentText, filePath, created_by],
      (error) => {
        if (error) {
          console.error("Gagal menambahkan konten:", error);
          return res.status(500).json({ message: "Gagal menambahkan konten" });
        }

        return res.status(201).json({
          message: "Konten berhasil ditambahkan",
        });
      }
    );
  });
};

// Ambil konten berdasarkan id_bab
exports.getKontenByBab = (req, res) => {
    const { id_bab } = req.params;

    db.query(
        "SELECT id_konten, judul, tipe, file_path, content_text FROM konten WHERE id_bab = ?",
        [id_bab],
        (err, results) => {
            if (err) {
                console.error("Gagal mengambil konten:", err);
                return res.status(500).json({ message: "Gagal mengambil konten" });
            }
            res.json(results);
        }
    );
};

// Update konten
exports.updateKonten = (req, res) => {
  const { id_konten } = req.params;

  // fallback aman jika req.body undefined (FormData kadang bikin undefined)
  const body = req.body || {};

  // ambil field dari body
  const judul = body.judul || "";
  const tipe = body.tipe || "text"; // default ke text
  const content_text = body.content_text || null;

  // ambil file_path dari upload multer jika ada
  const file_path = req.file ? `/uploads/${req.file.filename}` : body.file_path || null;

  const query = `
    UPDATE konten
    SET judul = ?, tipe = ?, content_text = ?, file_path = ?
    WHERE id_konten = ?
  `;

  db.query(query, [judul, tipe, content_text, file_path, id_konten], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update konten" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Konten tidak ditemukan" });
    }

    res.json({ message: "Konten berhasil diupdate" });
  });
};



// Delete konten
exports.deleteKonten = (req, res) => {
    const { id_konten } = req.params;

    if (!id_konten) {
        return res.status(400).json({ message: "ID konten wajib diisi" });
    }

    const query = "DELETE FROM konten WHERE id_konten = ?";
    db.query(query, [id_konten], (err, result) => {
        if (err) {
            console.error("Gagal hapus konten:", err);
            return res.status(500).json({ message: "Gagal hapus konten" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Konten tidak ditemukan" });
        }

        res.json({ message: "Konten berhasil dihapus" });
    });
};
