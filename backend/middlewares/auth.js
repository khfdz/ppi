require('dotenv').config(); // ⬅️ ini penting!
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verify Error:", err.message); // tambahkan log biar kelihatan
      return res
        .status(403)
        .json({ message: "Token tidak valid atau sudah kadaluarsa" });
    }

    req.user = user;
    next();
  });
};


// Middleware tambahan: cek role tertentu
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ message: "Role pengguna tidak ditemukan" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Akses ditolak, role '${userRole}' tidak diizinkan untuk endpoint ini.`,
      });
    }

    next();
  };
};
