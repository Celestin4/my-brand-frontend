import Base_URL from "../API/api.js";

const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("user-email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordError = document.getElementById("passwordError");
const passwordNotMatchingError = document.getElementById(
  "password-not-matching-error"
);
const togglePasswordCheckbox = document.getElementById("togglePassword");

fullNameInput.addEventListener("input", validateFullName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", passwordMatching);
togglePasswordCheckbox.addEventListener("change", togglePasswordVisibility);
document
  .getElementById("signupForm")
  .addEventListener("submit", handleFormSubmit);

passwordMatching();

function createErrorElement(id) {
  const errorElement = document.createElement("div");
  errorElement.id = id;
  errorElement.classList.add("error-message");
  return errorElement;
}

function validateFullName() {
  const fullName = fullNameInput.value.trim();
  const fullNamePattern = /^[a-zA-Z\s]+$/;
  let fullNameError = document.getElementById("fullNameError");

  if (!fullNamePattern.test(fullName)) {
    if (!fullNameError) {
      fullNameError = createErrorElement("fullNameError");
      fullNameInput.parentNode.appendChild(fullNameError);
    }
    fullNameError.textContent = "Please enter a valid full name";
  } else {
    if (fullNameError) {
      fullNameError.textContent = "";
    }
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailError = document.getElementById("emailError");

  if (!emailPattern.test(email)) {
    if (!emailError) {
      emailError = createErrorElement("emailError");
      emailInput.parentNode.appendChild(emailError);
    }
    emailError.textContent = "Please enter a valid email address";
  } else {
    if (emailError) {
      emailError.textContent = "";
    }
  }
}

function validatePassword() {
  const password = passwordInput.value;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  passwordError.textContent = passwordPattern.test(password)
    ? ""
    : "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.";
}

function passwordMatching() {
  passwordNotMatchingError.textContent =
    passwordInput.value !== confirmPasswordInput.value
      ? "Passwords don't match"
      : "";
}

function togglePasswordVisibility() {
  const isChecked = togglePasswordCheckbox.checked;
  const inputType = isChecked ? "text" : "password";

  passwordInput.type = inputType;
  confirmPasswordInput.type = inputType;

  passwordMatching();
}

function displayError(errorMessage) {
  let errorContainer = document.getElementById("errorContainer");
  errorContainer.style.display = "block";

  errorContainer.textContent = errorMessage;
}

async function handleFormSubmit(event) {
  event.preventDefault();
  validateFullName();
  validateEmail();
  validatePassword();
  passwordMatching();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const userData = { fullName, email, password };

  try {
    const response = await fetch(`${Base_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Network response was not ok";
      displayError(errorMessage);
      return;
    }

    const {token} = await response.json();
    localStorage.setItem("token", JSON.stringify(token));
    window.location.href = "../index.html";
  } catch (error) {
    displayError(
      "There is ploblem in registration. Please contact admin or try again later."
    );
  }
}
