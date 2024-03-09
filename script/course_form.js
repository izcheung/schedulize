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
        // Process form data here...
    });
});
