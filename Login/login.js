import Base_URL from '../API/api.js';

document
  .getElementById("togglePassword")
  .addEventListener("change", togglePasswordVisibility);

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const isChecked = document.getElementById("togglePassword").checked;

  if (isChecked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    validateForm();
  });

  function displayError(errorMessage) {
    let errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "block";
  
    errorContainer.textContent = errorMessage;
  }

async function validateForm() {
  const userEmail = document.getElementById("user-email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: userEmail,
    password: password,
  };

  try {
    const response = await fetch(
      `${Base_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const loggedUser = await response.json();

    if (response.ok) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      console.log(loggedUser);
      window.location.href = "../index.html";
    } else {
      const errorData = await response.user;
      console.log(errorData);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}
