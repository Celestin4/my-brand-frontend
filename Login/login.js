document.getElementById("togglePassword").addEventListener("change", togglePasswordVisibility);

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const isChecked = document.getElementById("togglePassword").checked;

    if (isChecked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    validateForm();
});

async function validateForm() {
    const userEmail = document.getElementById("user-email").value;
    const password = document.getElementById("password").value;

    const userData = {
        email: userEmail,
        password: password
    };

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Login successful!");
        } else {
            const errorData = await response.json();
            // alert("Error: " + errorData);
            console.log(errorData);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    }
}
