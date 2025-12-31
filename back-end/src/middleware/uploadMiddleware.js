const multer = require("multer");
const path = require("path");

// konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder upload
  },
  filename: (req, file, cb) => {
    // beri nama unik supaya tidak bentrok
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// filter tipe file opsional
const fileFilter = (req, file, cb) => {
  // hanya izinkan image/video
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
