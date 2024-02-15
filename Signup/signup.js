document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("confirm-password").addEventListener("input", passwordMatching);
document.getElementById("togglePassword").addEventListener("change", togglePasswordVisibility);


passwordMatching();


function validatePassword() {
    const password = this.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const passwordError = document.getElementById("passwordError");

    if (!passwordPattern.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.";
    } else {
        passwordError.textContent = "";
    }
}

function passwordMatching() {
    const passwordInput = document.getElementById("password");
    const confirmedPasswordInput = document.getElementById("confirm-password");
    const passwordNotMatching = document.getElementById("password-not-matching-error");

    if (passwordInput.value !== confirmedPasswordInput.value) {
        passwordNotMatching.textContent = "Passwords don't match";
    } else {
        passwordNotMatching.textContent = "";
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const confirmedPasswordInput = document.getElementById("confirm-password");
    const isChecked = document.getElementById("togglePassword").checked;

    if (isChecked) {
        passwordInput.type = "text";
        confirmedPasswordInput.type = "text"; 
    } else {
        passwordInput.type = "password"; 
        confirmedPasswordInput.type = "password";
    }

    passwordMatching();
}

