document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    var username = document.getElementById('userName').value;
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
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formDataToUrlEncoded(new FormData(this)),
        }).then(res => {if (res) {storeUser(username)} })
    }
});

/**
 * Stores a user's username in the session storage.
 * 
 * @param {String} username the user's username to store
 */
function storeUser(username) {
    sessionStorage.setItem('user', username);
}

/**
 * Encodes a form in the application/x-www-form-urlencoded format.
 * 
 * @param {FormData} form A form to translate into a form url 
 * @returns String - the form url to send to the server
 */
function formDataToUrlEncoded(form) {
    const pairs = [];
    for (const [key, value] of form.entries()) {
        // Encode each key and value, and add them to the pairs array
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    // Combine the pairs into a single query string
    return pairs.join('&');
}