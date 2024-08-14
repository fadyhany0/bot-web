const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listen for QR code generation
client.on('qr', qr => {
    console.log('QR Code received:', qr);
});

// Listen for successful authentication
client.on('authenticated', () => {
    console.log('Client authenticated');
});

// Listen for messages
client.on('message', message => {
    console.log(`Received message from ${message.from}: ${message.body}`);
});

// Start the WhatsApp client
client.initialize();

// Set up a route for sending messages
app.post('/send-message', (req, res) => {
    const { number, message } = req.body;
    const chatId = `${number}@c.us`;

    client.sendMessage(chatId, message)
        .then(response => {
            res.json({ success: true, response });
        })
        .catch(error => {
            res.status(500).json({ success: false, error });
        });
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
