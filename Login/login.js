
document.getElementById("togglePassword").addEventListener("change", togglePasswordVisibility);

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const isChecked = document.getElementById("togglePassword").checked;

    if (isChecked) {
        passwordInput.type = "text"; // Show password
    } else {
        passwordInput.type = "password"; // Mask password
    }
}


function validateForm() {
    const userEmail = document.getElementById("user-email").value;
    const password = document.getElementById("password").value;

    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('userData');

    if (!storedUserData) {
        alert("No user found. Please sign up first.");
        return false; // Prevent form submission
    }

    // Parse stored user data
    const userData = JSON.parse(storedUserData);

    // Check if the provided email and password match stored user data
    if (userData.email === userEmail && userData.password === password) {
        alert("Login successful!");
        return true; // Allow form submission
    } else {
        alert("Invalid email or password. Please try again.");
        return false; // Prevent form submission
    }
}
