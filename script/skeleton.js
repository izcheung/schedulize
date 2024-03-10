//---Loads the frame for the page (navbar)---//
function load_skeleton() {
    fetch('./navbar.html') // Path to your navbar.html file
        .then(response => response.text()) // Convert the response to text
        .then(html => {
            document.getElementById('navbar_placeholder').innerHTML = html; // Insert the HTML into the DOM
            console.log("Navbar loaded successfully."); // Debugging line
        })
        .catch(error => {
            console.error('Error loading the navbar:', error);
        });
}

//---Runs the function when the document is ready---//
document.addEventListener('DOMContentLoaded', (event) => {
    load_skeleton();
});

/**
 * Gets the user's username.
 *
 * @returns String - the user's username, or null
 */
function getUser() {
    return sessionStorage.getItem('user');
}