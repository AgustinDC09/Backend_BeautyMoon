require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const mercadopago = require('mercadopago');

const app = express();

// 🔹 Configuración de CORS mejorada
app.use(cors({
    origin: ["https://agustindc09.github.io", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// 🔹 Middleware adicional para manejar CORS correctamente en navegadores antiguos
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://agustindc09.github.io");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// ✅ Configuración de Mercado Pago con Access Token de producción
mercadopago.configurations = {
    access_token: process.env.MP_ACCESS_TOKEN
};

// 🔹 Ruta para generar pagos (POST)
app.post('/crear-pago', async (req, res) => {
    console.log("📩 Petición recibida en /crear-pago con body:", req.body);

    try {
        const { title, price, quantity } = req.body;
        if (!title || !price || !quantity) {
            return res.status(400).json({ error: "Faltan parámetros en la solicitud" });
        }

        const preference = {
            items: [
                {
                    title,
                    unit_price: parseFloat(price),
                    quantity: parseInt(quantity)
                }
            ],
            notification_url: "https://backend-beautymoon.onrender.com/webhook", // ✅ URL de notificación ajustada
            back_urls: {
                success: "https://tusitio.com/success",
                failure: "https://tusitio.com/failure",
                pending: "https://tusitio.com/pending"
            },
            auto_return: "approved"
        };

        console.log("🔹 Creando preferencia de pago...");

        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify(preference)
        });

        if (!response.ok) {
            throw new Error(`Error en la API de Mercado Pago: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Pago creado correctamente:", data);
        res.json(data);

    } catch (error) {
        console.error("❌ Error al crear pago:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Ruta de webhook para recibir notificaciones de pago y registrar en la BD
app.post('/webhook', async (req, res) => {
    console.log("🔹 Webhook recibido:", req.body);

    try {
        const paymentId = req.body.data.id; // 🔹 ID del pago

        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        });

        const paymentData = await response.json();
        console.log("✅ Detalles del pago:", paymentData);

        // ✅ Guardar estado del pago en la base de datos
        await sequelize.query(
            "INSERT INTO pagos (id_pago, estado, monto) VALUES (?, ?, ?)",
            {
                replacements: [paymentData.id, paymentData.status, paymentData.transaction_amount],
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.status(200).send("Webhook procesado correctamente");
    } catch (error) {
        console.error("❌ Error procesando webhook:", error.message);
        res.status(500).send("Error interno");
    }
});

// 🔹 Configuración de puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📡 Servidor escuchando en Render: https://backend-beautymoon.onrender.com`);
});
