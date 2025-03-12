// server.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse incoming JSON bodies
app.use(bodyParser.json());

// Webhook Secret (configured in .env file)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_KEY;

// Function to verify the signature
const verifySignature = (req) => {
  const signature = req.headers['x-flutterwave-signature'];
  const payload = JSON.stringify(req.body);
  
  // You can use crypto module to verify the signature here.
  // Flutterwave uses a signature to ensure the authenticity of the payload
  const computedSignature = calculateSignature(payload);

  return signature === computedSignature;
};

// Calculate the expected signature from the payload (use your secret)
const calculateSignature = (payload) => {
  // Implement your signature calculation logic here (e.g., HMAC, SHA256)
  const crypto = require('crypto');
  return crypto.createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('hex');
};

// Webhook endpoint for Flutterwave events
app.post('/api/flutterwave/webhook', (req, res) => {
  if (!verifySignature(req)) {
    return res.status(400).json({ status: 'error', message: 'Invalid signature' });
  }

  // Log the payload to the console for debugging
  console.log('Webhook received:', req.body);

  // Check the event type
  const event = req.body;

  if (event.event === 'transfer.completed') {
    // Handle successful transfer event
    console.log('Transfer successful:', event.data);

    // You can implement your business logic here
    // For example, updating the user's balance or notifying the user

    return res.status(200).json({ status: 'success', message: 'Transfer completed successfully' });
  } else {
    console.log('Unsupported event:', event.event);
    return res.status(400).json({ status: 'error', message: 'Unsupported event type' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
