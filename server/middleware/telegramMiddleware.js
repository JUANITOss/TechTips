const sendTelegramMessage = async (contactId, messageText) => {

  const fetch = (await import('node-fetch')).default;
  const token = '6916595365:AAGdsbG8OPr5AVVGRQdvcBQhWcTX2wKU0nU';
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: contactId,
      text: messageText,
    }),
  });

  if (response.ok) {
    console.log('Message sent:', messageText);
  } else {
    console.log('Failed to send message:', await response.text() + contactId);
  }
};

module.exports = { sendTelegramMessage };
