const express = require("express");
const router = express.Router();
const babController = require("../controllers/babController");

router.get("/:id_bab/konten", babController.getKontenByBab);
router.post("/", babController.createBab);

module.exports = router;
