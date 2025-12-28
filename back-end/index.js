require("dotenv").config();
const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const materiRoutes = require("./src/routes/materiRoutes");
const babRoutes = require("./src/routes/babRoutes");
const kontenRoutes = require("./src/routes/kontenRoutes");
const cors = require("cors");
const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api/materi", materiRoutes);
app.use("/api/bab", babRoutes);
app.use("/api/konten", kontenRoutes);
app.use("/uploads", express.static("uploads"));



app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
