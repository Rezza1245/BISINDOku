const express = require("express");
const router = express.Router();
const materiController = require("../controllers/materiController");

//get semua materi
router.get("/:id_materi/bab", materiController.getBabByMateri);
router.get("/:id_materi", materiController.getMateriById);
router.get("/", materiController.getAllMateri);
router.get("/materi/:id_materi/bab", materiController.getBabByMateri);

//Post tambah materi
router.post("/:id_materi/bab", materiController.createBab);
router.post("/", materiController.createMateri);


module.exports = router;
