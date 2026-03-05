const connection = require("../configuration/database.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mySecretKeyxxx";

// Login de usuarios
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("auth/login", {
            error: "Email y contraseña son requeridos"
        });
    }

    try {
        const [rows] = await connection.execute(
            "SELECT id, fullname, email, phone, password FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.render("auth/login", {
                error: "Credenciales inválidas"
            });
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.render("auth/login", {
                error: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Guardar token en cookie o sesión
        res.cookie("token", token);

        return res.redirect("/admin/dashboard");

    } catch (error) {
        console.error(error);
        return res.render("auth/login", {
            error: "Error en el servidor"
        });
    }
};
// Crear usuario
exports.register = async (req, res) => {
    const { fullname, email, phone, password } = req.body;

    if (!fullname || !email || !phone || !password) {
        return res.render("auth/register", {
            error: "Todos los campos son requeridos"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            "INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)",
            [fullname, email, phone, hashedPassword]
        );

        return res.redirect("/auth/login");

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.render("auth/register", {
                error: "El email ya está registrado"
            });
        }

        return res.render("auth/register", {
            error: "Error en el servidor"
        });
    }
};


