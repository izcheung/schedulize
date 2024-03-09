//---Loads the frame for the page (navbar)---//
function load_skeleton() {
    fetch('./navbar.html') // Path to your navbar.html file
        .then(response => response.text()) // Convert the response to text
        .then(html => {
            document.getElementById('navbar_placeholder').innerHTML = html; // Insert the HTML into the DOM
        })
        .catch(error => {
            console.error('Error loading the navbar:', error);
        });
}

//---Runs the function when the document is ready---//
document.addEventListener('DOMContentLoaded', (event) => {
    load_skeleton();
});
