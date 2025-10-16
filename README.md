## 🗓️ Schedulize

🎬 [Watch our hackathon demo on YouTube](https://www.youtube.com/watch?v=VIOvAmCSE6c)

![image](https://github.com/user-attachments/assets/5d124f9f-c2c0-44be-a80a-e6ac9790c146)
![image](https://github.com/user-attachments/assets/818a25cc-778d-404a-bbc0-bec660cfcef2)

### Table of Contents

1. [Summary](#summary)
2. [Motivation](#motivation)
3. [Requirements](#requirements)
4. [Tech Stack](#tech-stack)
5. [Quick Start](#quick-start)
6. [Features](#features)
7. [Project Structure](#project-structure)
8. [Contributors](#contributors)
9. [Gallery](#gallery)
10. [Resources](#resources)

## Summary

"Schedulize" is a web app prototype that helps students plan study time by breaking their tasks into manageable blocks and scheduling them around courses and productivity patterns. Users can register, input courses and assignments, and view an optimized calendar showing suggested study times.

## Motivation

Students often struggle to balance coursework, deadlines, and personal well-being. Schedulize was built to reduce the stress of planning by automatically prioritizing tasks and proposing a realistic schedule. By factoring in assignment priority, due dates, and self-reported productivity windows, the app supports healthier study habits and a better work–life balance.

## Requirements

- Node.js 18+
- MongoDB Atlas database (or local MongoDB)

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose 8
- **Auth/Security**: bcrypt for password hashing
- **Additional**: FullCalendar

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/izcheung/schedulize.git
cd schedulize
```

2. Install dependencies:

```bash
npm install
```

3. Configure the database:

- Update the MongoDB connection string in `Server/database_server.js` inside `connect()` if needed.
- Ensure your MongoDB user has permission to read/write the target database.

4.  Start the backend server:

```bash
node Server/database_server.js
```

The server listens on port 3000 by default.

5.  Serve the frontend:

- Open the HTML files via a local server (e.g., VS Code “Live Server”).
- Suggested entry points: `landing_page.html` or `home_page.html`.

## Features

- User Authentication & Profile Management
- Calendar interface view
- Assignment Input & Management
- Priority Scoring for Assignments
- Productivity Assessment

## Project Structure

```text
schedulize/
├── add_course_form.html
├── assignment_form.html
├── calendar.html
├── home_page.html
├── images/
│   ├── default_profile.png
│   ├── logo.png
│   └── schedulize_logo.png
├── landing_page.html
├── login.html
├── navbar.html
├── package-lock.json
├── package.json
├── productivity_questions.html
├── profile_page.html
├── README.md
├── registration_form.html
├── script/
│   ├── assignment_form.js
│   ├── course_form.js
│   ├── landing_page.js
│   ├── login.js
│   ├── populate_calendar.js
│   ├── productivity_questions.js
│   ├── registration_form.js
│   └── skeleton.js
├── Server/
│   └── database_server.js          # Express server, Mongo connection, API routes
└── styles/
    ├── add_course_form.css
    ├── assignment_form.css
    ├── calendar.css
    ├── calendar2.css
    ├── landing_page.css
    ├── login.css
    ├── navbar.css
    ├── productivity_questions.css
    ├── profile.css
    └── registration_form.css
```

## Contributors

- Irene Cheung - Frontend Developer
- Olivia Grace - Backend Developer
- Dipenvir Kaur - Frontend Developer
- Jaiden Duncan - Backend Developer
- Peter Senyk - Frontend Developer

## Gallery

### Create Account

![image](https://github.com/user-attachments/assets/60263ec0-6f54-4d52-af45-6ae80e7e53dd)

### Profile Page

![image](https://github.com/user-attachments/assets/25d72e15-6526-455f-89c0-97a446f07dbe)

### Add Assignment

![image](https://github.com/user-attachments/assets/95dff5a0-3aa5-4c29-acd4-01e98b2f1bde)

## Resources

- logo image - https://cdn.iconscout.com/icon/free/png-256/free-calendar-2065964-1746113.png
