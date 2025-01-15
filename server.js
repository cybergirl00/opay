require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

// MongoDB connection
const uri = 'mongodb+srv://dikkorabiat25:KRJPuYk2pwVID9vK@opay.7efac.mongodb.net/?retryWrites=true&w=majority&appName=opay';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    accountRef: { type: String, required: true },
    amount: { type: Number, required: true },
    phone: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const cardSchema = new mongoose.Schema({
    userId:  { type: String, required: true },
    cardRef:  { type: String, required: true },
});

const Card = mongoose.model("Card", cardSchema)

// Create a Flutterwave Subaccount
app.post('/create-subaccount', async (req, res) => {
    const { email, firstName, lastName, phone } = req.body;

    try {
        const response = await axios.post(
            'https://api.flutterwave.com/v3/payout-subaccounts',
            {
                email: email,
                mobileNumber: phone,
                country: "NG",
                account_name: `${firstName} ${lastName}`,
            },
            {
                headers: {
                    Authorization: `Bearer FLWSECK-b775d93a3b14a0be4427b31a3f03cd4a-19461e011d9vt-X`
                }
            }
        );

        if (response.data.status !== 'success') {
            throw new Error('Failed to create subaccount');
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error creating subaccount:', error.response?.data || error);
        res.status(500).json({ error: 'Failed to create subaccount' });
    }
});


// Save User in MongoDB
app.post('/users', async (req, res) => {
    const { email, clerkId, firstName, lastName, accountNumber, bankName, accountRef, amount, phone } = req.body;

    try {
        const newUser = new User({ email, clerkId, firstName, lastName, accountNumber, bankName, accountRef, amount, phone });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to add user to database' });
    }
});

app.post('/create-card', async (req, res) => {
    const { userId, cardRef } = req.body;
    try {
        const newCard = new Card({ userId, cardRef });
        await newCard.save();
        res.status(201).json({ message: 'Card created successfully' });
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Failed to create card' });
    }
});


app.get('/get-user', async (req, res) => {
    const { clerkId } = req.query; // Use req.query for GET requests

    if (!clerkId) {
        return res.status(400).json({ error: 'clerkId is required' });
    }

    try {
        const user = await User.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to retrieve user from database' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
