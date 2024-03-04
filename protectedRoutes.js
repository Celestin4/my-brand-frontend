const token = localStorage.getItem('token');
if (!token) {
// Redirect user to another page or perform other actions
window.location.href = "http://127.0.0.1:5500/index.html"; // Redirect to login page
}

