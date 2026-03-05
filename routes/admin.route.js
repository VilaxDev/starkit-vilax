const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Aplicar middleware de verificación a todas las rutas
router.use(verifyToken);

// Dashboard
router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
    user: req.user
  });
});

// Perfil del usuario - Obtener datos
router.get("/profile", profileController.getProfile);

// Editar usuario
router.get("/edit-user/:id", (req, res) => {
  res.render("admin/edit-user", {
    title: "Editar Usuario",
    user: { id: req.params.id }
  });
});

// Actualizar perfil
router.post("/update-profile", profileController.updateProfile);

// Eliminar cuenta
router.post("/delete-account", profileController.deleteAccount);

module.exports = router;
