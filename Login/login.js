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

async function validateForm() {
  const userEmail = document.getElementById("user-email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: userEmail,
    password: password,
  };

  try {
    const response = await fetch(
      "https://my-brand-backend-8mqk.onrender.com/api/users/login",
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
      // alert("Error: " + errorData);
      console.log(errorData);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}
