document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // cancel redirect
    const form = new FormData(e.target);

    const username = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToUrlEncoded(form)
    })

    if (username.ok) {
        storeUser(await username.text());
        location.href = 'landing_page.html';
    } else {
        alert("Incorrect password. Please try again.")
    }
})

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

/**
 * Stores a user's username in the session storage.
 * 
 * @param {String} username the user's username to store
 */
function storeUser(username) {
    sessionStorage.setItem('user', username);
}