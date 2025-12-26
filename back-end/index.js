require("dotenv").config();
const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const cors = require("cors");

const app = express(); 
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
