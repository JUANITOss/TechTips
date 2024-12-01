const express = require('express');
const router = express.Router();
const UserPrompts = require('../models/UserPrompts');
const verifyAuth = require('../middleware/authMiddleware');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyC5MNQ4b8Rbzvzpm0XbijKB75t42yS2TUQ');  

router.post('/', verifyAuth, async (req, res) => {
  const { prompt } = req.body;
  const userId = req.session.userId;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContentStream([prompt]);

    let generatedText = '';
    for await (const chunk of result.stream) {
      generatedText += chunk.text();
    }

    let userPrompts = await UserPrompts.findOne({ userId: userId });
    
    if (!userPrompts) {
      userPrompts = new UserPrompts({ userId, prompts: [] });
    }

    const addedPrompt = await userPrompts.addPrompt(prompt);
    if (!addedPrompt) {
      return res.status(500).json({ message: 'Error al agregar el prompt a la base de datos.' });
    }

    res.json({ generatedText });
  } catch (error) {
    console.error('Error en la comunicación con la API de generación de IA:', error);
    res.status(500).send('Error en la comunicación con la API de generación de IA');
  }
});

module.exports = router;
