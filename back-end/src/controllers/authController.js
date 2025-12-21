const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (rows.length === 0)
    return res.status(400).json({ msg: "User tidak ditemukan" });

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Password salah" });

  const token = jwt.sign(
    { id_user: user.id_user, role: user.role },
    "secretkey",
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};
