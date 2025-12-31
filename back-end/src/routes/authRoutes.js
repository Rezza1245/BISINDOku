const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const { dashboardController } = require("../controllers/dashboardController");
const materiController = require("../controllers/materiController");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/logout", authController.logout);

router.get("/dashboard", auth, dashboardController);
router.post("/materi", auth, materiController.createMateri);

module.exports = router;
