// Module imports
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// allows requests from any source
app.use(cors());

// simplifies accessing request information in post routes when using HTML forms
app.use(express.urlencoded({extended: true}));

// sets up allowing cookies
app.use(session({
    secret: '-09234-0qdjfoia-oidsfjqwefop;lwec}}o[{okie;l]][091-82=',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: true // needs https
    } 
  }));

/**
 * Connects to the MongoDB cluster.
 */
async function connect() {
    await mongoose
    .connect('mongodb+srv://CST:CAitwuZrN9c0DIEH@schedulize.whemhcp.mongodb.net/?retryWrites=true&w=majority&appName=Schedulize'); 
}

const user_login_schema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: { // the name of the field
        type: String,
        required: true // NOT NULL
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    school: String,
    program: String
});

const user_login_model = mongoose.model('user_login', user_login_schema);

/*
* Register route.
*
* This route handles user registration. The password is encoded using 
* bcrypt, and then stored on the database.
* If the user's email is already associated with an account, returns 400.
*/
app.post('/register', async (req, res) => {
    const salt_rounds = 10;
    const { fullName, email, userName, password, school, program } = req.body;

    if (!email || !password) {
        return res.status(400).send('Must include both email and password.')
    }

    if ((await user_login_model.find({'email': email})).length !== 0) {
        return res.status(400).send('Email already associated with an account.');
    }

    const hashed_password = await bcrypt.hash(password, salt_rounds);

    const login_instance = new user_login_model({
        full_name: fullName,
        email: email,
        user_name: userName,
        password: hashed_password,
        school: school,
        program: program
    });

    login_instance.save();

    req.session.user = true; // TODO - change to uniquely identifying part of user document
    req.session.uID = null; // TODO - change to username / w/e we want to display

    res.status(200).send('Registration successful');
    // res.redirect(303, 'http://127.0.0.1:5501/landing_page.html');
});

/*
* Login route.
*
* This route handles the login procedure. 
* A user's login document must contain the password field to be considered an account.
*/
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Must include both email and password.')
    }
    
    const login_info = await user_login_model
    .find({'email': email, 'password': {$exists: true}});

    if (login_info.length === 0) {
        return res.status(400).send({'error': 'No account associated with email.'});
    }

    let validated = false;

    try {
        validated = await bcrypt.compare(password, login_info[0]['password']);
    } catch {
        return res.status(500).send("Error with validating password");
    }

    if (validated) {
        req.session.user = true; // TODO - change to uniquely identifying part of user document
        req.session.uID = null; // TODO - change to username / w/e we want to display

        res.status(200).send('Login successful');
        // res.redirect(303, 'http://127.0.0.1:5501/landing_page.html');
    } else {
        res.status(401).send('Incorrect password.'); // 401 is technically wrong here 
    }
});

app.post('/form/course', (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).send("User not logged in.");
    }

    const { courseName, courseInstructor, ...daysTimes } = req.body;

    const course_information = {
        course: courseName,
        instructor: courseInstructor,
    } // TODO - Add the days and times information

    // const course_instance = new course_model(course_information); // TODO - create model, finish course_information object
});

app.post('/form/assignment', (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).send("User not logged in.");
    }

    const { assignment_name, 
        course_tags, 
        assignment_hours, 
        assignment_due_date, 
        assignment_worth, 
        ...task_split } = req.body; // TODO - Work out stuff surrounding task_split

    const assignment_information = {
        assignment: assignment_name,
        course: course_tags,
        hours: assignment_hours,
        due: assignment_due_date,
        value: assignment_worth
    }; // TODO - finish object

    // const assignment_instance = new assignment_model(assignment_information); // TODO - finish above
});

app.get('/auth/status', (req, res) =>{
    if (req.session && req.session.uID) {
        res.status(200).send(req.session.uID);
    } else {
        res.status(200).send(null);
    }
});

app.get('/', async (req, res) => {
    return res.status(500).send('Server is blank right now');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);

    connect();
});