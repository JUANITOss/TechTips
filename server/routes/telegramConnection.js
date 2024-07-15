const express = require('express');
const verifyAuth = require('../middleware/authMiddleware');
const { sendTelegramMessage } = require('../middleware/telegramMiddleware');
const router = express.Router();

router.post('/send-message', verifyAuth ,async (req, res) => {
    const { chatId, messageText } = req.body;
    
    // Anexando las ultimas 5 prompts al mensaje
    
    
    if (chatId && messageText) {
        await sendTelegramMessage(chatId, messageText);
        res.status(200).send({ message: 'Message sent successfully' });
    } else {
        res.status(400).send({ error: 'chatId and messageText are required' });
    }
});

module.exports = router;