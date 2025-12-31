const express = require("express");
const router = express.Router();
const kontenController = require("../controllers/kontenController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");



// GET semua konten berdasarkan Bab
router.get("/:id_bab/konten", auth, kontenController.getKontenByBab);

// POST tambah konten baru
router.post("/upload", auth, kontenController.uploadKonten);

// PUT update konten
router.put("/:id_konten", auth, upload.single("file"), kontenController.updateKonten);

// DELETE hapus konten
router.delete("/:id_konten", auth, kontenController.deleteKonten);

module.exports = router;
