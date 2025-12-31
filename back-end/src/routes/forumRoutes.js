const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const auth = require("../middleware/authMiddleware"); // pastikan auth ada
const checkAdmin = require("../middleware/checkAdmin");

// GET semua topik
router.get("/", auth, forumController.getAllTopik);

// GET topik + komentar
router.get("/:id_topik", auth, forumController.getTopikById);

// POST buat topik (admin only)
router.post("/topik", auth, checkAdmin, forumController.createTopik);

// POST komentar
router.post("/:id_topik/komentar", auth, forumController.addKomentar);

module.exports = router;
