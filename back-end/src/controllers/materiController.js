const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.getAllMateri = (req, res) => {
  const query = "SELECT * FROM materi";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil materi" });
    }
    res.json(results);
  });
};

exports.getMateriById = (req, res) => {
  const { id_materi } = req.params;

  const query = "SELECT * FROM materi WHERE id_materi = ?";

  db.query(query, [id_materi], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil materi" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Materi tidak ditemukan" });
    }

    res.json(results[0]);
  });
};


exports.getBabByMateri = (req, res) => {
  const { id_materi } = req.params;

  const query = `
    SELECT * FROM bab
    WHERE id_materi = ?
    ORDER BY id_bab ASC
  `;

  db.query(query, [id_materi], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil bab" });
    }

    res.json(results);
  });
};

exports.createMateri = (req, res) => {
  const { judul, deskripsi, created_by } = req.body;

  if (!judul || !created_by) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const query = `
    INSERT INTO materi (judul, deskripsi, created_by)
    VALUES (?, ?, ?)
  `;

  db.query(query, [judul, deskripsi, created_by], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menambahkan materi" });
    }

    res.status(201).json({
      message: "Materi berhasil ditambahkan",
      id_materi: result.insertId,
    });
  });
};

exports.createBab = (req, res) => {
  const { id_materi } = req.params;
  const { judul_bab } = req.body;

  if (!judul_bab) {
    return res.status(400).json({ message: "Judul bab wajib diisi" });
  }

  const query = `
    INSERT INTO bab (id_materi, judul_bab)
    VALUES (?, ?)
  `;

  db.query(query, [id_materi, judul_bab], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menambahkan bab" });
    }

    res.status(201).json({
      message: "Bab berhasil ditambahkan",
      id_bab: result.insertId,
    });
  });
};

