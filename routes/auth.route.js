const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Rutas públicas
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Iniciar Sesión"
  });
});

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Registrarse"
  });
});

router.post("/login", authController.login);
router.post("/register", authController.register);

// Ruta para logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;