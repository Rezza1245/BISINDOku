const express = require("express");
const router = express.Router();
const kontenController = require("../controllers/kontenController");

router.post("/", kontenController.uploadKonten);

module.exports = router;
