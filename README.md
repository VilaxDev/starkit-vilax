# Starkit - Plataforma de Gestión de Usuarios

Una plataforma moderna de gestión de usuarios construida con Node.js, Express.js, EJS y Tailwind CSS. Incluye autenticación JWT, dashboard responsivo, y gestión completa de perfiles.

## 🚀 Características

- ✅ Autenticación segura con JWT
- ✅ Registro e inicio de sesión
- ✅ Dashboard administrativo responsivo
- ✅ Gestión completa de perfil de usuario
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Interfaz moderna y responsiva con Tailwind CSS
- ✅ Iconos Font Awesome integrados
- ✅ Avatares 3D dinámicos
- ✅ Menú hamburguesa para dispositivos móviles
- ✅ Notificaciones en tiempo real

## 📋 Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- MySQL (v5.7 o superior)

## 📦 Instalación

### Opción 1: Instalar como paquete npm

```bash
npx degit VilaxDev/starkit-vilax my-app
cd my-app
```

### Opción 2: Clonar el repositorio

```bash
git clone https://github.com/tuusuario/starkit-vilax.git
cd starkit-vilax
npm install
```

## ⚙️ Configuración

### 1. Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env`:

```env
PORT=5000
JWT_SECRET=tuclavesecretamuylargaramayor32caracteres
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tucontraseña
DB_NAME=starkit
DB_PORT=3306
```

### 2. Crear la base de datos

```sql
CREATE DATABASE starkit;
USE starkit;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Uso

### Iniciar en desarrollo

```bash
npm run dev
```

### Iniciar en producción

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:5000`

### Rutas principales

- `GET /` - Página principal
- `GET /auth/login` - Página de inicio de sesión
- `GET /auth/register` - Página de registro
- `POST /auth/login` - Procesar inicio de sesión
- `POST /auth/register` - Procesar registro
- `GET /admin/dashboard` - Dashboard (requiere autenticación)
- `GET /admin/profile` - Perfil del usuario (requiere autenticación)
- `POST /admin/update-profile` - Actualizar perfil (requiere autenticación)
- `POST /admin/delete-account` - Eliminar cuenta (requiere autenticación)
- `GET /auth/logout` - Cerrar sesión
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Iniciar la aplicación**

```bash
npm start
```

Para desarrollo con recarga automática:

```bash
npm run dev
```

## Rutas

### Rutas Públicas
- `GET /auth/login` - Página de inicio de sesión
- `POST /auth/login` - Procesar login
- `GET /auth/register` - Página de registro
- `POST /auth/register` - Procesar registro
- `GET /auth/logout` - Cerrar sesión

### Rutas Protegidas (requieren autenticación)
- `GET /admin/dashboard` - Dashboard principal
- `GET /admin/profile` - Perfil de usuario
- `POST /auth/update-profile` - Actualizar perfil
- `POST /auth/delete-account` - Eliminar cuenta
- `GET /admin/users` - Lista de usuarios (admin)
- `GET /admin/edit-user/:id` - Editar usuario (admin)
- `POST /auth/update-user/:id` - Actualizar usuario (admin)
- `POST /auth/delete-user/:id` - Eliminar usuario (admin)

## Estructura de archivos

```
Starkit/
├── app.js                          # Archivo principal
├── package.json
├── .env                            # Variables de entorno
├── configuration/
│   └── database.config.js          # Configuración de MySQL
├── controllers/
│   └── auth.controller.js          # Lógica de autenticación
├── middleware/
│   └── auth.middleware.js          # Middleware de JWT
├── routes/
│   └── auth.route.js               # Rutas de autenticación
├── views/
│   ├── auth/
│   │   ├── login.ejs               # Página de login
│   │   └── register.ejs            # Página de registro
│   └── admin/
│       ├── dashboard.ejs           # Dashboard
│       ├── profile.ejs             # Perfil de usuario
│       ├── users.ejs               # Gestión de usuarios
│       └── edit-user.ejs           # Editar usuario
└── migrations/
    └── 001-create-users-table.js  # Migración inicial
```

## Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de datos:** MySQL2
- **Autenticación:** JWT (jsonwebtoken)
- **Seguridad:** bcrypt
- **Frontend:** EJS, Tailwind CSS, FontAwesome Icons
- **Configuración:** dotenv

## Seguridad

⚠️ **IMPORTANTE**: Esta es una aplicación de ejemplo. Para producción:
- Cambiar la clave JWT_SECRET por una más segura
- Implementar HTTPS
- Agregar validación de entrada más robusta
- Implementar rate limiting
- Agregar CSRF protection
- Usar HTTPS cookies

## Funcionalidades

### Autenticación
- Registro con encriptación de contraseña
- Login con generación de JWT
- Verificación de token en rutas protegidas
- Logout con eliminación de cookies

### Gestión de Usuarios
- Ver perfil personal
- Editar información personal
- Cambiar contraseña
- Eliminar cuenta
- Listar todos los usuarios (admin)
- Editar usuarios (admin)
- Eliminar usuarios (admin)

## Notas de Desarrollo

- Los tokens JWT expiran en 24 horas
- Las contraseñas se almacenan encriptadas con bcrypt
- La aplicación usa cookies para almacenar el token JWT
- Las rutas protegidas redirigen a login si no hay autenticación

## Licencia

ISC
