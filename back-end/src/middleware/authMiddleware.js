const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Token tidak ada" });

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json({ msg: "Token tidak valid" });
    
    req.user = user; // user.id_user & user.role
    next();
  });
};
