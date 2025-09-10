const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const nodemailer = require('nodemailer');

const registrarUsuario = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ error: "El correo ya está registrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

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
        console.trace('❌ Error al obtener usuarios:', error);
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

// 🔐 Recuperar contraseña
const recuperarPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: "No se encontró un usuario con ese correo" });
        }

        // Configurar transporte con SendGrid
        const transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY
            }
        });

        const mailOptions = {
            from: 'Beauty Moon <agustindiazcontreras4321@gmail.com>',
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Hola ${usuario.username},\n\nRecibimos una solicitud para recuperar tu contraseña.\n\nPor seguridad, no enviamos contraseñas directamente. Si querés restablecerla, respondé a este correo o contactanos.\n\nGracias por usar Beauty Moon 💫`
        };

        // Enviar el correo
        try {
            await transporter.sendMail(mailOptions);
            console.log("📧 Correo enviado con SendGrid");
            res.status(200).json({ mensaje: "Correo enviado con éxito" });
        } catch (error) {
            console.error("❌ Error al enviar correo:", error);
            res.status(500).json({ error: "Error al enviar el correo", detalle: error.message });
        }

    } catch (error) {
        console.error("❌ Error general en recuperación:", error);
        res.status(500).json({ error: "Error interno en recuperación", detalle: error.message });
    }
};


module.exports = {
    obtenerUsuarios,
    registrarUsuario,
    eliminarUsuario,
    recuperarPassword
};
