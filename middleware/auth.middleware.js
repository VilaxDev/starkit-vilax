const jwt = require("jsonwebtoken");
const connection = require("../configuration/database.config");

const JWT_SECRET = process.env.JWT_SECRET || "mySecretKeyxxx";

// Middleware para verificar token JWT
exports.verifyToken = async (req, res, next) => {
  // Verificar token en cookies o headers
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1] || req.headers["x-access-token"];

  if (!token) {
    return res.redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Obtener los datos completos del usuario desde la base de datos
    const [rows] = await connection.execute(
      "SELECT id, fullname, email, phone FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      res.clearCookie("token");
      return res.redirect("/auth/login");
    }

    // Asignar los datos completos del usuario a req.user
    req.user = rows[0];
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
};
