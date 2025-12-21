exports.createMateri = async (req, res) => {
  const { judul, deskripsi, file } = req.body;
  const id_user = req.user.id_user;

  await db.query(
    "INSERT INTO materi (judul, deskripsi, file, created_by) VALUES (?, ?, ?, ?)",
    [judul, deskripsi, file, id_user]
  );

  res.json({ msg: "Materi berhasil ditambahkan" });
};

exports.getMateri = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM materi");
  res.json(rows);
};

exports.getMateriById = async (req, res) => {
  const id = req.params.id; // id_materi

  const [rows] = await db.query(
    "SELECT * FROM materi WHERE id_materi = ?",
    [id]
  );

  res.json(rows[0]);
};

exports.updateMateri = async (req, res) => {
  const id = req.params.id; // id_materi
  const { judul, deskripsi, file } = req.body;

  await db.query(
    "UPDATE materi SET judul = ?, deskripsi = ?, file = ? WHERE id_materi = ?",
    [judul, deskripsi, file, id]
  );

  res.json({ msg: "Materi diperbarui" });
};

exports.deleteMateri = async (req, res) => {
  const id = req.params.id;

  await db.query("DELETE FROM materi WHERE id_materi = ?", [id]);

  res.json({ msg: "Materi dihapus" });
};
