// Imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const verifAuth = require('./middleware/authMiddleware').default;

// Init app
const app = express();

// Middleware cors (sync con axios en cliente)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204 // Retorna 204 No Content en las respuestas a los métodos que solicitan el successStatus  
}));

// Middleware HTTP
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

// Manejo de archivos para /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexion MongoDB
const connectMongoDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/techtips');
      console.log('Conectado a MongoDB');
  
    } catch (error) {
      console.error('Error conectando a MongoDB: ', error);
      process.exit(1);
    }
};
connectMongoDB();

// Manejo de express sessions
app.use(session({
    secret: "password",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false},
}));

// Ruta de testeo de verificacion
app.get('/verifyUser', verifAuth, (req, res) => {
    res.status(200).send(`ID del usuario: ${req.session.userId}, EMAIL: ${req.session.email}`);
});

// Routing del proyecto

// USTEDES MODIFICAN SOLO URLS Y RUTAS !!!!

// URLS (SINTAXIS GENERAL: const rutaRoutes = require('./routes/ruta');)
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// RUTAS (SINTAXIS GENERAL: app.use('/ruta', handleOptions, rutaRoutes);)
app.use('/auth', handleOptions, authRoutes);
app.use('/posts', handleOptions, postRoutes);

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});