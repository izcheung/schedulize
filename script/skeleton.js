//---Loads the frame for the page (navbar)---//
function load_skeleton() {
    console.log($(`#navbar_placeholder`)).load(`./navbar.html`);
}

//---Runs the function when the document is ready---//
$(document).ready(function() {
    load_skeleton();
});