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

    document.getElementById('course-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const courseName = document.getElementById('courseName').value;
        const courseInstructor = document.getElementById('courseInstructor').value;
        const classTimes = Array.from(document.querySelectorAll('.schedule-block')).map(block => {
            return {
                day: block.querySelector('.day-select').value,
                startTime: block.querySelector('.time-input[type="time"]:first-of-type').value,
                endTime: block.querySelector('.time-input[type="time"]:last-of-type').value
            };
        });

        // Send the data to the server
        try {
            const response = await fetch('http://localhost:3000/form/course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseName, courseInstructor, classTimes }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Course added successfully', result);
                // Reset the form or redirect the user
                // document.getElementById('course-form').reset();
                // window.location.href = '/some-success-page';
            } else {
                throw new Error('Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    });
});
