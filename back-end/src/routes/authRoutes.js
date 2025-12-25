const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/register", (req, res) => {
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
      console.error(err);
      return res.json({ message: "Register gagal" });
    }

    res.json({ 
      message: "Register berhasil",
      role: role
    });

  });
});

router.post("/login", (req, res) => {
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
});


module.exports = router;
