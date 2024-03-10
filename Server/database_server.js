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

app.use(express.json()); // For parsing application/json 

/**
 * Connects to the MongoDB cluster.
 */
async function connect() {
    await mongoose
    .connect('mongodb+srv://CST:CAitwuZrN9c0DIEH@schedulize.whemhcp.mongodb.net/?retryWrites=true&w=majority&appName=Schedulize'); 
}

const assignment_schema = new mongoose.Schema({
    assignment: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true,
        min: 0
    },
    due: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    priority:{
        type: Number,
        required: true
    }
});

// Class Time Sub-schema
const classTimeSchema = new mongoose.Schema({
    day: String,
    startTime: String,
    endTime: String
});

const course_schema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    classTimes: [classTimeSchema]
    // TODO - Figure out how to store the times / days
});

const Course = mongoose.model('Course', courseSchema);


const user_login_schema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: { // the name of the field
        type: String,
        required: true, // NOT NULL
        index: true, // Acts like a primary key
        unique: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    school: String,
    program: String,
    assignments: [assignment_schema]
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

    let login_instance;
    try {
        login_instance = new user_login_model({
            full_name: fullName,
            email: email,
            user_name: userName,
            password: hashed_password,
            school: school,
            program: program
        });
    } catch {
        return res.status(400).send(false);
    }

    login_instance.save(); // writes to the DB

    res.status(200).send([true, login_instance['_id']]);
});

/*
* Login route.
*
* This route handles the login procedure. 
* A user's login document must contain the password field to be considered an account.
*/
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { // TODO - update this to check that all required items are present
        return res.status(400).send('Must include both email and password.')
    }

    const login_info = await user_login_model
    .find({'email': email, 'password': {$exists: true}}); // queries the DB

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
        res.status(200).send([login_info[0]['user_name'], login_info[0]['_id']].join('|'));
    } else {
        res.status(401).send('Incorrect password.'); // 401 is technically wrong here 
    }
});

/*
* Course regitration route.
*/
app.post('/form/course', async (req, res) => {

    const { courseName, courseInstructor, classTimes } = req.body; // Ensure classTimes is structured correctly from the client-side

    try {
        const newCourse = new Course({
            course: courseName,
            instructor: courseInstructor,
            classTimes: classTimes // Assuming classTimes is an array of objects with day, startTime, endTime
        });

        await newCourse.save();
        res.status(200).json({ message: 'Course added successfully' });
    } catch (error) {
        console.error('Failed to add course:', error);
        res.status(500).json({ message: 'Failed to add course', error: error.message });
    }
});

const assignment_model = mongoose.model('assignment', assignment_schema);

app.post('/form/assignment', (req, res) => {
    console.log("in database_server for assignment");
    // const { assignment_name, 
    //     course_tags, 
    //     assignment_hours, 
    //     assignment_due_date, 
    //     assignment_worth, 
    //     assignment_priority,
    //     ...task_split } = req.body; // TODO - Work out stuff surrounding task_split
    const { assignment, 
        // course_tags, 
        hours, 
        due, 
        value, 
        priority} = req.body; // TODO - Work out stuff surrounding task_split


    const assignment_information = {
        assignment,
        // course: course_tags,
        hours,
        due,
        value,
        priority
    }; // TODO - finish object

    // const assignment_instance = new assignment_model(assignment_name, assignment_hours, assignment_due_date, assignment_worth, assignmnet_priority);
    let assignment_instance;
    try {
        assignment_instance = new assignment_model(assignment_information);
    } catch {
        return res.status(400).send(false);
    }
    console.log("about to save!!!");
    assignment_instance.save(); // writes to the DB

    res.status(200).send(true); // 10 minutes

    // const assignment_instance = new assignment_model(assignment_information); // TODO - finish above
});

app.get('/', async (req, res) => {
    return res.status(500).send('Server is blank right now');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);

    connect();
});