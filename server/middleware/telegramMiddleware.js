const sendTelegramMessage = async (chatId, messageText) => {

  const fetch = (await import('node-fetch')).default;
  const token = 'your-telegram-bot-token';
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
    }),
  });

  if (response.ok) {
    console.log('Message sent:', messageText);
  } else {
    console.log('Failed to send message:', await response.text());
  }
};

module.exports = { sendTelegramMessage };
