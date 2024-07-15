const express = require('express');
const verifyAuth = require('../middleware/authMiddleware');
const { sendTelegramMessage } = require('../middleware/telegramMiddleware');
const UserPrompts = require('../models/UserPrompts');
const router = express.Router();

router.post('/send-message', verifyAuth, async (req, res) => {
  const { chatId, messageText } = req.body;
  const userId = req.session.userId;

  try {

    // Obtener las últimas 5 prompts del usuario
    const userPrompts = await UserPrompts.findOne({ userId });
    let promptsText = '';
    if (userPrompts && userPrompts.prompts.length > 0) {
      promptsText = userPrompts.prompts.join('\n');
    }

    const fullMessage = `${messageText}\n\nÚltimas 5 prompts:\n${promptsText}`;

    if (chatId && messageText) {
      await sendTelegramMessage(chatId, fullMessage);
      res.status(200).send({ message: 'Message sent successfully' });
    } else {
      res.status(400).send({ error: 'chatId and messageText are required' });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ error: 'Failed to send message' });
  }
});

module.exports = router;
