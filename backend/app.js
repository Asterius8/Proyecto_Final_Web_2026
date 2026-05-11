  const express = require("express");
  const cors = require("cors");

  const app = express();

  app.use(cors());
  app.use(express.json());

  // Importamos rutas
  const pacienteRoutes = require("./routes/pacienteRoutes");
  const authRoutes = require("./routes/authRoutes");

  // Usamos rutas
  app.use("/api/paciente", pacienteRoutes);
  app.use("/api", authRoutes);

  app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
  });