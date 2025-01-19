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

const uri = process.env.MONGODB_URL
const flutterwavekey = process.env.FLUTTERWAVE_SECRET_KEY

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
    cardId:  { type: String, required: true },
    holderId:   { type: String, required: true },
});

const Card = mongoose.model("Card", cardSchema);

const transactionsSchema = new mongoose.Schema({
    ref: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    points: { type: Number, required: true },
    fee: { type: Number, required: true },
    available: {type: Boolean, required: true}
});

const Transaction = mongoose.model("Transactions", transactionsSchema);


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
                    Authorization: `Bearer ${flutterwavekey}`
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
    const { userId, first_name, last_name, email, phone, address, state, postal_code, bvn, id_image, id_number  } = req.body;
    try {
        // Create a card holder
        const createHolder = await axios.post('https://api.ufitpay.com/v1/create_card_holder', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            address: address,
            state: state,
            country: "Nigeria",
            postal_code: postal_code,
            kyc_method: 'NIGERIAN_NIN',
            bvn: bvn,
            id_image: id_image,
            id_number: id_number
        }, {
            headers: {
                'Api-Key': 'pub-5177477ca1639a7d0fd3814aa6459e6d', // Replace with your actual API key
                'Api-Token': 'sec-4302a4fb2c252d12d53289c2a2d4a1b5', // Replace with your actual API token
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        console.log(createHolder)
        if (createHolder.data.status !== 'success') {
            console.log('Something went wrong while creating holder', createHolder);
            return res.status(400).json({ error: 'Failed to create card holder', createHolder });
        }
        console.log(createHolder);

        if(createHolder.data.status === 'success') {
            try {
           const createCard =  await axios.post('https://api.ufitpay.com/v1/create_virtual_card', 
                {
                    card_brand: 'mastercard',
                    card_currency: 'NGN',
                    card_holder_id: createHolder.data.data.card_holder_id
                }, 
                {
                        headers: {
                            'Api-Key': 'pub-5177477ca1639a7d0fd3814aa6459e6d', // Replace with your actual API key
                'Api-Token': 'sec-4302a4fb2c252d12d53289c2a2d4a1b5', // Replace with your actual API token
                'Content-Type': 'application/x-www-form-urlencoded',
                        }
                }
            )
            if(createCard.data.status === 'success') {
                console.log(createCard.data);
                const newCard = new Card({ userId, cardId: createCard.data.data.id, holderId: createHolder.data.data.card_holder_id  });
                await newCard.save();
                res.status(201).json({ message: 'Card created successfully' });
            } else { 
                console.log('Something went wrong while creating card')
            }
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('Something went wrong while creating holder')
        }
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


app.post('/transaction', async (req, res) => {
    const { ref, userId, type, points, fee, available } = req.body;

    try {
        const newTransaction = new Transaction({ ref, userId, type, points, fee, available });
        await newTransaction.save();
        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Failed to add transaction to database' });
    }
})

app.post('/transfer', async (req, res) => {
    const { account_number, account_bank, narration, amount, debit_subaccount } = req.body;
    
    try {
      const sendMoney = await axios.post(
        `https://api.flutterwave.com/v3/transfers`,
        {
          account_number,
          account_bank,
          amount,
          debit_subaccount,
          narration,
          currency: 'NGN'
        },
        {
          headers: {
            Authorization: `Bearer ${flutterwavekey}`
          }
        }
      );

      console.log('Transfer Response:', sendMoney.data);
      
      if (sendMoney.data.status === 'success') {
        console.log('✅ Transfer Successful');
        // Send response directly without assigning it to a variable
        return res.json(sendMoney.data); 
      } else {
        console.warn('⚠️ Transfer Failed');
        return res.status(400).json({
          success: false,
          error: sendMoney.data.message
        });
      }
    } catch (error) {
      console.error('❌ Error:', error);
      return res.status(500).json({
        success: false,
        error: 'An error occurred while processing the transfer.'
      });
    }
});

  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
