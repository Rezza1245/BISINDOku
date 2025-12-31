// controllers/dashboardController.js
exports.dashboardController = (req, res) => {
  res.json({
    message: "Selamat datang di dashboard",
    user: req.user, // dari authMiddleware
  });
};
