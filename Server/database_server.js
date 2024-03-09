// Module imports
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// allows requests from any source
app.use(cors());

// simplifies accessing request information in post routes when using HTML forms
app.use(express.urlencoded({extended: true})); 

/**
 * Connects to the MongoDB cluster.
 */
async function connect() {
    await mongoose.connect('mongodb+srv://CST:CAitwuZrN9c0DIEH@schedulize.whemhcp.mongodb.net/?retryWrites=true&w=majority&appName=Schedulize'); 
}

const user_login_schema = new mongoose.Schema({
    email: { // the name of the field
        type: String,
        required: true // NOT NULL
    },
    password: {
        type: String,
        required: true
    }
});

const user_login_model = mongoose.model('user_login', user_login_schema);

app.post('/register', async (req, res) => {
    const salt_rounds = 10;
    const { email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, salt_rounds);

    const login_instance = new user_login_model({
        email: email,
        password: hashed_password
    });

    // everything past this point in the method needs to be tested
    // Probably makes multiple copies of the same document
    login_instance.save((e) => {
        if (e) console.error(e);
    });

    res.status(200).send('Registration successful');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const login_info = await user_login_model.find({'email': email});

    if (login_info.length === 0) {
        return res.status(400).send({'error': 'No account associated with email.'});
    }

    if (await bcrypt.compare(password, login_info['password'])) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send({'error': 'Incorrect password.'}); // 401 is technically wrong here 
    }
});

app.get('/', async (req, res) => {
    return res.status(500).json({'error': 'Server is blank right now'});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);

    connect();
});