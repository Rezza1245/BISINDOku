const express = require("express");
const router = express.Router();
const materiController = require("../controllers/materiController");
const auth = require("../middleware/authMiddleware");

//get semua materi
router.get("/:id_materi/bab", materiController.getBabByMateri);
router.get("/:id_materi", materiController.getMateriById);
router.get("/", materiController.getAllMateri);
router.get("/materi/:id_materi/bab", materiController.getBabByMateri);

//Post tambah materi
router.post("/:id_materi/bab", materiController.createBab);
router.post("/", materiController.createMateri);

// Update
router.put("/:id_materi", auth, materiController.updateMateri);

// Delete
router.delete("/:id_materi", auth, materiController.deleteMateri);

module.exports = router;
