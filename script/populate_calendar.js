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

// Function to transform class time to event object
function classTimeToEvent(course, classTime) {
    // Convert class time to FullCalendar event here...
    // The `day` field should be converted to a Date object.
    // For this example, let's assume you have a function that does this conversion:
    const date = convertDayToDate(classTime.day); // Implement this function
    return {
        title: course.course + ' - ' + course.instructor,
        start: date + 'T' + classTime.startTime,
        end: date + 'T' + classTime.endTime
    };
}

// Function to fetch courses and populate the calendar
async function fetchCoursesAndPopulateCalendar() {
    try {
        // Fetch the course data from the server
        const response = await fetch('/api/courses'); // Adjust this endpoint as necessary
        const courses = await response.json();

        // Transform course data into FullCalendar events
        const events = courses.flatMap(course =>
            course.classTimes.map(classTime => classTimeToEvent(course, classTime))
        );

        // Assuming you have a FullCalendar instance initialized
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            // ... other options
            events: events // Add the events to the calendar
        });

        calendar.render();
    } catch (error) {
        console.error('Failed to fetch courses:', error);
    }
}

// Call this function when your page is loaded or when you need to refresh the calendar data
fetchCoursesAndPopulateCalendar();

