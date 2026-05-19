const express = require("express");
const cors = require("cors");

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

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});