const express = require("express");
const router = express.Router();

router.get("/auth-test", (req, res) => {
  res.json({ message: "Auth Route OK" });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // LOGIN DUMMY
  if (username === "admin" && password === "123") {
    return res.json({
      success: true,
      message: "Login berhasil"
    });
  }

  res.status(401).json({
    success: false,
    message: "Username atau password salah"
  });
});



module.exports = router;
