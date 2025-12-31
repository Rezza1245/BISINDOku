// Middleware cek user role admin
module.exports = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Hanya admin yang bisa membuat topik" });
    }
    next();
};
