const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.uploadKonten = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload gagal" });
    }

    const {
      id_bab,
      judul,
      deskripsi,
      tipe,
      content_text,
      created_by,
    } = req.body;

    if (!id_bab || !judul || !tipe || !created_by) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    let filePath = null;
    if (tipe !== "teks") {
      if (!req.file) {
        return res.status(400).json({ message: "File wajib diupload" });
      }
      filePath = req.file.path;
    }

    const query = `
      INSERT INTO konten
      (id_bab, judul, deskripsi, tipe, file_path, content_text, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [id_bab, judul, deskripsi, tipe, filePath, content_text, created_by],
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Gagal menyimpan konten" });
        }
        res.status(201).json({ message: "Konten berhasil ditambahkan" });
      }
    );
  });
};
