const Usuario = require('../models/usuario');

// 🔹 Nueva función dedicada al registro
const registrarUsuario = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ mensaje: "El correo ya está registrado" });
        }

        const nuevoUsuario = await Usuario.create({ username, email, password });
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
        res.json(usuarios);
    } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
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
        console.error('❌ Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno al eliminar usuario', detalle: error.message });
    }
};

module.exports = { obtenerUsuarios, registrarUsuario, eliminarUsuario };
