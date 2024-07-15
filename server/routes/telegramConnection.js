const express = require('express');
const verifyAuth = require('../middleware/authMiddleware');
const { sendTelegramMessage } = require('../middleware/telegramMiddleware');
const UserPrompts = require('../models/UserPrompts');
const router = express.Router();

router.post('/sendMessage', verifyAuth, async (req, res) => {

  const { contactId, messageText } = req.body;
  const userId = req.session.userId;

  try {

    // Obtener las últimas 5 prompts del usuario
    const userPrompts = await UserPrompts.findOne({ userId });
    let promptsText = '';
    if (userPrompts && userPrompts.prompts.length > 0) {
      promptsText = userPrompts.prompts.join('\n');
    }

    const fullMessage = `${messageText}\nÚltimas 5 prompts:\n\n${promptsText}`;

    if (contactId && messageText) {
      await sendTelegramMessage(contactId, fullMessage);
      res.status(200).send({ message: 'Message sent successfully' });
    } else {
      res.status(400).send({ error: 'contactId and messageText are required' + contactId });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    console.log(`${contactId} ${messageText}`);
    res.status(500).send({ error: 'Failed to send message' + contactId + fullMessage });
  }
});

module.exports = router;
