const token = localStorage.getItem('token');
if (!token) {
window.location.href = "http://127.0.0.1:5500/index.html";
}

