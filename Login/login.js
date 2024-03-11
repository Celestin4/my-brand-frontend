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

    HandleLogin();
  });

  function displayError(errorMessage) {
    let errorContainer = document.getElementById("errorContainer");
    errorContainer.style.display = "block";
  
    errorContainer.textContent = errorMessage;
  }

async function HandleLogin() {
  const userEmail = document.getElementById("user-email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: userEmail,
    password: password,
  };

  console.log(userData);

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

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Network response was not ok";
      displayError(errorMessage);
      return;
    }

    const {token} = await response.json();

      localStorage.setItem("token", JSON.stringify(token));
      console.log(token);
      window.location.href = "../index.html";
   
  } catch (error) {
   displayError('There is a problem, Try again later')
  }
}
