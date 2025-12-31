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

exports.getBabById = (req, res) => {
  const { id_bab } = req.params;

  if (!id_bab) {
    return res.status(400).json({ message: "ID Bab wajib diisi" });
  }

  const query = "SELECT * FROM bab WHERE id_bab = ?";
  db.query(query, [id_bab], (err, results) => {
    if (err) {
      console.error("Gagal mengambil Bab:", err);
      return res.status(500).json({ message: "Gagal mengambil Bab" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Bab tidak ditemukan" });
    }

    res.json(results[0]); // kembalikan satu object Bab
  });
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

exports.tambahBab = (req, res) => {
  const { id_materi } = req.params;
  const { judul_bab } = req.body;

  const query = `
    INSERT INTO bab (judul_bab, id_materi)
    VALUES (?, ?)
  `;

  db.query(query, [judul_bab, id_materi], (err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal tambah bab" });
    }
    res.json({ message: "Bab berhasil ditambahkan" });
  });
};

exports.updateBab = (req, res) => {
  const { id_bab } = req.params;
  const { judul_bab } = req.body;

  if (!judul_bab) {
    return res.status(400).json({ message: "Judul Bab wajib diisi" });
  }

  const query = "UPDATE bab SET judul_bab = ? WHERE id_bab = ?";
  db.query(query, [judul_bab, id_bab], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update bab" });
    }

    res.json({ message: "Bab berhasil diupdate" });
  });
};

// DELETE Bab
exports.deleteBab = (req, res) => {
  const { id_bab } = req.params; // ambil id Bab dari URL

  // validasi id_bab
  if (!id_bab) {
    return res.status(400).json({ message: "ID Bab wajib diisi" });
  }

  // query delete
  const query = "DELETE FROM bab WHERE id_bab = ?";
  db.query(query, [id_bab], (err, result) => {
    if (err) {
      console.error("Gagal hapus Bab:", err);
      return res.status(500).json({ message: "Gagal hapus Bab" });
    }

    if (result.affectedRows === 0) {
      // jika id_bab tidak ditemukan
      return res.status(404).json({ message: "Bab tidak ditemukan" });
    }

    // sukses
    res.json({ message: "Bab berhasil dihapus" });
  });
};