const express = require("express");
const router = express.Router();
const babController = require("../controllers/babController");
const auth = require("../middleware/authMiddleware");

//get semua bab
router.get("/:id_bab/konten",auth, babController.getKontenByBab);

router.get("/:id_bab", auth, babController.getBabById);

// UPDATE Bab
router.put("/:id_bab", auth, babController.updateBab);

// DELETE Bab
router.delete("/:id_bab", auth, babController.deleteBab);

module.exports = router;
