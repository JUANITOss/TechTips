const express = require('express');
const router = express.Router();
const UserPrompts = require('../models/UserPrompts');
const verifyAuth = require('../middleware/authMiddleware');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializar la instancia de la IA generativa
const genAI = new GoogleGenerativeAI('AIzaSyDJsdIl8ulGHR_urNpVmIXwEyvWmHeGQBw');  

// Endpoint para generar contenido
router.post('/', verifyAuth, async (req, res) => {
  const { prompt } = req.body;
  const userId = req.session.userId;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContentStream([prompt]);

    // Capturar el texto generado
    let generatedText = '';
    for await (const chunk of result.stream) {
      generatedText += chunk.text();
    }

    // Guardar el prompt en la base de datos
    let userPrompts = await UserPrompts.findOne({ userId: userId });
    
    if (!userPrompts) {
      userPrompts = new UserPrompts({ userId, prompts: [] });
    }

    await userPrompts.addPrompt(prompt);

    res.json({ generatedText });
  } catch (error) {
    console.error('Error en la comunicación con la API de generación de IA:', error);
    res.status(500).send('Error en la comunicación con la API de generación de IA');
  }
});

module.exports = router;
