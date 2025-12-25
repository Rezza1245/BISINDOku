exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    // 1️⃣ Error database
    if (err) {
      return res.status(500).json({ message: "DB error" });
    }

    // 2️⃣ User tidak ditemukan
    if (results.length === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    // 3️⃣ AMBIL DATA USER DARI DB
    const user = results[0];

    // 4️⃣ CEK PASSWORD
    if (user.password !== password) {
      return res.status(401).json({ message: "Password salah" });
    }

    // 5️⃣ LOGIN BERHASIL → KIRIM ROLE
    res.json({
      message: "Login berhasil",
      user: {
      role: user.role,   // admin / student
      id: user.id_user,
      username: user.username
      }
    });
  });
};
