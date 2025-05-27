const bcrypt = require('bcrypt'); // 🔹 Para seguridad en contraseñas
const Usuario = require('../models/usuario');

const registrarUsuario = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ error: "El correo ya está registrado" });
        }

        // 🔹 Encriptar contraseña antes de almacenarla
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 🔹 Registrar usuario en la base de datos
        const nuevoUsuario = await Usuario.create({ username, email, password: passwordHash });
        
        res.status(201).json({ mensaje: "✅ Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);
        res.status(500).json({ error: "Error en el servidor", detalle: error.message });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'username', 'email']
        });

        if (!usuarios.length) {
            return res.status(404).json({ error: "No hay usuarios registrados aún" });
        }

        res.json(usuarios);
    } catch (error) {
        console.trace('❌ Error al obtener usuarios:', error); // 🔹 Mejor diagnóstico
        res.status(500).json({ error: 'Error al obtener usuarios', detalle: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.trace('❌ Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno al eliminar usuario', detalle: error.message });
    }
};

module.exports = { obtenerUsuarios, registrarUsuario, eliminarUsuario };
