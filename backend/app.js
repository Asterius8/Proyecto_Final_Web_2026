const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
}); 