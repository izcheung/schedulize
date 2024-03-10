document.addEventListener('DOMContentLoaded', function() {
    let scheduleCount = 1;

    document.getElementById('add-schedule').addEventListener('click', function() {
        const scheduleBlock = document.querySelector('.schedule-block').cloneNode(true);
        scheduleBlock.setAttribute('data-schedule', scheduleCount);
        scheduleBlock.querySelectorAll('.time-input').forEach(input => input.value = '');
        document.getElementById('schedule-blocks').appendChild(scheduleBlock);
        scheduleCount++;
    });

    document.getElementById('schedule-blocks').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-schedule')) {
            event.target.closest('.schedule-block').remove();
        }
    });

    document.getElementById('course-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const courseName = document.getElementById('courseName').value;
        const courseInstructor = document.getElementById('courseInstructor').value;
        const classTimes = Array.from(document.querySelectorAll('.schedule-block')).map(block => {
            return {
                day: block.querySelector('.day-select').value,
                startTime: block.querySelector('.time-input[type="time"]:nth-child(3)').value,
                endTime: block.querySelector('.time-input[type="time"]:nth-child(4)').value,
            };
        });

        // Prepare the course data
        const courseData = {
            courseName,
            courseInstructor,
            classTimes
        };

        // Send an AJAX request to your server
        $.ajax({
            url: '/form/course', // Your server endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(courseData),
            success: function(response) {
                console.log('Course added successfully:', response);
                // Optionally redirect or update UI here
            },
            error: function(error) {
                console.error('Error adding course:', error);
            }
        });
    });
});
