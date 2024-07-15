// Imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const verifAuth = require('./middleware/authMiddleware');
const connectMongoDB = require('./middleware/mongoMiddleware');
const handleOptions = require('./middleware/handlerMiddleware');

// Init app
const app = express();

// Json y encode config
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cors config
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204   
}));

// Files config
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
connectMongoDB();

// Express sessions config
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

// URLS (SINTAXIS GENERAL: const rutaRoutes = require('./routes/ruta');)
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const chatbotRoutes = require('./routes/chatbot');
const telegramRoutes = require('./routes/telegramConnection');

// RUTAS (SINTAXIS GENERAL: app.use('/ruta', handleOptions, rutaRoutes);)
app.use('/user', handleOptions, userRoutes);
app.use('/post', handleOptions, postRoutes);
app.use('/chatbot', handleOptions, chatbotRoutes);
app.use('/telegram', handleOptions, telegramRoutes);

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});