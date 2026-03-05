const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const adminRoutes = require("./routes/admin.route");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// Configuración de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de administración
app.use("/admin", adminRoutes);

// Ruta raíz - redirige a login si no está autenticado
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Aplicacion funcionando correctamente",
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Página no encontrada"
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    title: "Error del servidor",
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});