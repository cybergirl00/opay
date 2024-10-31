require('dotenv').config(); // Load environment variables
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Move this above routes for better practice
const port = 3000;

const uri = "mongodb+srv://dikkorabiat25:KRJPuYk2pwVID9vK@opay.7efac.mongodb.net/?retryWrites=true&w=majority&appName=opay";
// MONGODB CONNECTION
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Mongodb connected'))
.catch((err) => console.log('Not connected', err));

// SCHEMA MODEL
const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true},
    email: { type: String, required: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    accountNumber: {type: String, required: true},
    bankName: { type: String, required: true},
    accountRef: {type: String, required: true},
    amount: {type: Number, required: true},
    phone: {type: Number, required: true}
});

const User = mongoose.model('User', userSchema);

// create a paystack subaccount 
app.post('/create-subaccount', async (req, res) => {
    const { email, account_name, mobilenumber } = req.body;

    try {
        // flutterwave subaccount connection string
        const response = await axios.post('https://api.flutterwave.com/v3/payout-subaccounts',
            {
                email, 
                account_name,
                mobilenumber,
                country: 'NG',
                bank_code: 035
            },
           {
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer FLWSECK-82b3fb24e3da0fbf5955d444bd29e292-192b5134e28vt-X`,
            },}
        );
        res.status(201).json(response.data)
        
    } catch (error) {
        console.log(error)
    }

})

app.get('/list-subaccounts', async (req, res) => {
    try {
        const response = await axios.get('https://api.flutterwave.com/v3/payout-subaccounts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer FLWSECK-82b3fb24e3da0fbf5955d444bd29e292-192b5134e28vt-X`
            }
        });
        
        // Respond with the list of payout subaccounts
        res.status(200).json(response.data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching subaccounts', error });
    }
});


// Change this from app.get to app.post
app.post('/users', async (req, res) => {
    console.log(req.body); // Log the incoming request body
    const { email, clerkId, firstName, lastName, accountNumber, bankName, accountRef, amount, phone } = req.body;
    try {
        const newUser = new User({ email, clerkId, firstName, lastName, accountNumber, bankName, accountRef, amount, phone });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log(error); // Log the error for further investigation
        res.status(400).json({ message: 'Error adding user', error });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
