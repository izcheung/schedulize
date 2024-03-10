// Function to fetch course and assignment data for FullCalendar
function fetchAndFormatEvents(fetchInfo, successCallback, failureCallback) {
    Promise.all([
        fetch('/api/courses').then(response => response.json()), // Fetch courses
        fetch('/api/assignments').then(response => response.json()) // Fetch assignments
    ]).then(values => {
        const [courses, assignments] = values;
        const events = formatCourses(courses).concat(formatAssignments(assignments));
        successCallback(events); // Use this data as events in FullCalendar
    }).catch(error => {
        console.error('Error fetching events:', error);
        failureCallback(error);
    });
}

function formatCourses(courses) {
    // Convert course data to FullCalendar event format
    // ...
}

function formatAssignments(assignments) {
    // Convert assignment data to FullCalendar event format
    // ...
}

