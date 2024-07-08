// Imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Init app
const app = express();

// Middleware cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204 // Retorna 204 No Content en las respuestas a los métodos que solicitan el successStatus  
}));

// Middleware HTTP condicionales
const handleOptions = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
};

// Middleware json y encode
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Conexion MongoDB
const connectMongoDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/tienda');
      console.log('Conectado a MongoDB');
  
    } catch (error) {
      console.error('Error conectando a MongoDB: ', error);
      process.exit(1);
    }
};
connectMongoDB();

// Sesiones
app.use(session({
    secret: "password",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false},
}));

// Ruta protegida: perfil del usuario
function verificarAutenticacion(req, res, next) {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send('No autenticado');
    }
};

app.get('/perfil', verificarAutenticacion, (req, res) => {
    res.status(200).send(`ID del usuario: ${req.session.userId}`);
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend conectado correctamente' });
});

// USTEDES MODIFICAN SOLO URLS Y RUTAS !!!!

// URLS (SINTAXIS GENERAL: const rutaRoutes = require('./routes/ruta');)

// RUTAS (SINTAXIS GENERAL: app.use('/ruta', handleOptions, rutaRoutes);)


// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});