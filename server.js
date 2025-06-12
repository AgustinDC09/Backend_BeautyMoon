require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const mercadopago = require('mercadopago');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

const allowedOrigins = [
  'https://agustindc09.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:5500'
];

// CORS configurado
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  },
  credentials: true,
}));

// Middleware adicional CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Rutas de usuario
app.use('/usuarios', usuarioRoutes);

// Configuración de Mercado Pago
mercadopago.configurations = {
  access_token: process.env.MP_ACCESS_TOKEN
};

app.post('/crear-pago', async (req, res) => {
  try {
    const { title, price, quantity } = req.body;

    if (!title || !price || !quantity) {
      return res.status(400).json({ error: "Faltan datos para crear el pago" });
    }

    const preference = {
      items: [
        { title, unit_price: parseFloat(price), quantity: parseInt(quantity) }
      ],
      notification_url: "https://backend-beautymoon.onrender.com/webhook",
      back_urls: {
        success: "https://tusitio.com/success",
        failure: "https://tusitio.com/failure",
        pending: "https://tusitio.com/pending"
      },
      auto_return: "approved"
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preference)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error al crear pago:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/webhook', async (req, res) => {
  try {
    const paymentId = req.body.data.id;
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    });

    const paymentData = await response.json();

    await sequelize.query(
      "INSERT INTO pagos (id_pago, estado, monto) VALUES (?, ?, ?)",
      {
        replacements: [paymentData.id, paymentData.status, paymentData.transaction_amount],
        type: sequelize.QueryTypes.INSERT
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error procesando webhook:", error);
    res.status(500).send("Error interno");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Servidor corriendo en https://backend-beautymoon.onrender.com`);
});
