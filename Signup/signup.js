// Cache DOM elements
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("user-email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordError = document.getElementById("passwordError");
const passwordNotMatchingError = document.getElementById(
  "password-not-matching-error"
);
const togglePasswordCheckbox = document.getElementById("togglePassword");

// Add event listeners
fullNameInput.addEventListener("input", validateFullName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", passwordMatching);
togglePasswordCheckbox.addEventListener("change", togglePasswordVisibility);
document
  .getElementById("signupForm")
  .addEventListener("submit", handleFormSubmit);

// Initial validation
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


function handleFormSubmit(event) {
  event.preventDefault();

  // Perform validation before submitting the form
  validateFullName();
  validateEmail();
  validatePassword();
  passwordMatching();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Check if passwords match
  if (password !== confirmPassword) {
    passwordNotMatchingError.textContent = "Passwords do not match";
    return;
  }

  // If all validations pass, proceed with form submission
  const userData = { fullName, email, password };

  // Store user data in local storage
  localStorage.setItem("userData", JSON.stringify(userData));

  // Redirect the user to another page after signup
  window.location.href = "../index.html";
}
