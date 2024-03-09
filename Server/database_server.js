// Module imports
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// Setup
const app = express();
app.use(cors());


async function connect() {
    await mongoose.connect('mongodb+srv://CST:CAitwuZrN9c0DIEH@schedulize.whemhcp.mongodb.net/?retryWrites=true&w=majority&appName=Schedulize'); 
}

app.get('/', async (req, res) => {
    return res.status(500).json({'error': 'Server is blank right now'});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});