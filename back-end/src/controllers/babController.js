const db = require("../config/db");

exports.getKontenByBab = (req, res) => {
  const { id_bab } = req.params;

  db.query(
    "SELECT id_konten, judul, tipe, file_path, content_text FROM konten WHERE id_bab = ?",
    [id_bab],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Gagal mengambil konten" });
      }
      res.json(results);
    }
  );
};

exports.createBab = (req, res) => {
  const { id_materi, judul_bab } = req.body;

  if (!id_materi || !judul_bab) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  db.query(
    "INSERT INTO bab (id_materi, judul_bab) VALUES (?, ?)",
    [id_materi, judul_bab],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Gagal menambah bab" });
      }
      res.status(201).json({ message: "Bab berhasil ditambahkan" });
    }
  );
};
