const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Importamos rutas
const pacienteRoutes = require("./routes/pacienteRoutes");
const authRoutes = require("./routes/authRoutes");
const citasRoutes = require("./routes/citasRoutes");
const medicosRoutes = require("./routes/medicosRoutes");

// Usamos rutas
app.use("/api/medicos", medicosRoutes);

// Usamos rutas
app.use("/api/paciente", pacienteRoutes);

app.use("/api", authRoutes);

app.use("/api/citas", citasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});