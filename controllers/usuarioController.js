const Usuario = require('../models/usuario');

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación de datos
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'El correo ya está registrado' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = await Usuario.create({ username, email, password });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('❌ Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'username', 'email']  // 🔹 Excluye "password"
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

module.exports = { obtenerUsuarios, crearUsuario, eliminarUsuario };
