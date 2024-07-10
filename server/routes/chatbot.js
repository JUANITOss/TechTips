const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializar la instancia de la IA generativa
const genAI = new GoogleGenerativeAI('AIzaSyDJsdIl8ulGHR_urNpVmIXwEyvWmHeGQBw');  

// Endpoint para generar contenido
router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContentStream([prompt]);

    // Capturar el texto generado
    let generatedText = '';
    for await (const chunk of result.stream) {
      generatedText += chunk.text();
    }

    res.json({ generatedText });
  } catch (error) {
    console.error('Error en la comunicación con la API de generación de IA:', error);
    res.status(500).send('Error en la comunicación con la API de generación de IA');
  }
});

module.exports = router;
