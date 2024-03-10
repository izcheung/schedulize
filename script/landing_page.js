function initialLoad() {
    let user = getUser();

    document.getElementById('username').innerHTML = user;
}

document.addEventListener('DOMContentLoaded', initialLoad());