const db = require("../config/db");

exports.register = (req, res) => {
  const { username, password, adminCode } = req.body;

  let role = "student";

  if (adminCode) {
    if (adminCode !== process.env.ADMIN_REGISTER_CODE) {
      return res.status(403).json({
        message: "Kode admin tidak valid",
      });
    }
    role = "admin";
  }

  if (!username || !password) {
    return res.json({ message: "Data tidak lengkap" });
  }

  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
  db.query(sql, [username, password, role], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message: "Username sudah digunakan",
        });
      }

      console.error(err);
      return res.status(500).json({
        message: "Register gagal",
      });
    }

    res.json({
      message: "Register berhasil",
      role: role,
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "Data tidak lengkap" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ message: "Login error" });
    }

    if (results.length === 0) {
      return res.json({ message: "User tidak ditemukan" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.json({ message: "Password salah" });
    }

    res.json({
      message: "Login berhasil",
      user: {
        id_user: user.id_user,
        username: user.username,
        role: user.role
      }
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.json({ message: "Data tidak lengkap" });
  }

  const checkUser = "SELECT * FROM users WHERE username = ?";
  db.query(checkUser, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.json({ message: "Username tidak ditemukan" });
    }

    const updatePassword =
      "UPDATE users SET password = ? WHERE username = ?";
    db.query(updatePassword, [newPassword, username], (err) => {
      if (err) {
        console.error(err);
        return res.json({ message: "Gagal update password" });
      }

      res.json({ message: "Password berhasil diubah" });
    });
  });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout berhasil" });
};
