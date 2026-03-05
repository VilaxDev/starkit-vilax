const connection = require("../configuration/database.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mySecretKeyxxx";


// Obtener perfil de usuario y mostrar en la vista
exports.getProfile = async (req, res) => {
    try {
        // Obtener el token de las cookies
        const token = req.cookies.token;

        if (!token) {
            return res.redirect("/auth/login");
        }

        // Decodificar el token para obtener el ID del usuario
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Obtener los datos del usuario desde la base de datos
        const [rows] = await connection.execute(
            "SELECT id, fullname, email, phone FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.redirect("/auth/login");
        }

        const user = rows[0];

        // Enviar los datos del usuario a la vista
        return res.render("admin/profile", {
            user: user,
            error: null
        });

    } catch (error) {
        console.error(error);
        return res.redirect("/auth/login");
    }
};

// Actualizar perfil de usuario
exports.updateProfile = async (req, res) => {
    try {
        const { fullname, email, phone } = req.body;

        // Validar campos requeridos
        if (!fullname || !email || !phone) {
            return res.render("admin/profile", {
                user: req.body,
                error: "Todos los campos son requeridos"
            });
        }

        // Obtener el token para conseguir el ID del usuario
        const token = req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Actualizar los datos en la base de datos
        await connection.execute(
            "UPDATE users SET fullname = ?, email = ?, phone = ? WHERE id = ?",
            [fullname, email, phone, userId]
        );

        // Obtener los datos actualizados
        const [rows] = await connection.execute(
            "SELECT id, fullname, email, phone FROM users WHERE id = ?",
            [userId]
        );

        return res.render("admin/profile", {
            user: rows[0],
            error: null,
            success: "Perfil actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        // Obtener datos actuales para mostrar en caso de error
        const token = req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const [rows] = await connection.execute(
            "SELECT id, fullname, email, phone FROM users WHERE id = ?",
            [userId]
        );

        return res.render("admin/profile", {
            user: rows[0],
            error: "Error al actualizar el perfil"
        });
    }
};

// Eliminar cuenta de usuario
exports.deleteAccount = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Eliminar el usuario de la base de datos
        await connection.execute(
            "DELETE FROM users WHERE id = ?",
            [userId]
        );

        // Limpiar la cookie del token
        res.clearCookie("token");

        // Redirigir al login
        return res.redirect("/auth/login");

    } catch (error) {
        console.error(error);
        return res.redirect("/admin/dashboard");
    }
};
