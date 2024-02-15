
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