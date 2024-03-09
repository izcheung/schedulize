document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    // Add more variables as necessary

    var errors = []; // Store error messages

    if(username.length < 5) {
        errors.push("Username must be at least 5 characters long.");
    }
    if(password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    // You can use regex for more complex validations like email format

    if(errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        // Submit the form data if validation passes
        // For demonstration purposes, we'll just log the data
        console.log("Form submitted with:", {username, password, email});
        // Here you would typically send the data to a server via AJAX
    }
});
