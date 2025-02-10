// Mock database to store user data
const users = [];

// Login Form Handler
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if user exists in the database
  const user = users.find((user) => user.username === username);

  if (user && user.password === password) {
    document.getElementById("login-message").textContent = "Login successful!";
    document.getElementById("login-message").style.color = "green";
  } else if (user && user.password !== password) {
    document.getElementById("login-message").textContent = "Incorrect password!";
    document.getElementById("login-message").style.color = "red";
  } else {
    // User not found, redirect to registration
    document.getElementById("login-message").textContent = "User not found. Redirecting to registration...";
    document.getElementById("login-message").style.color = "orange";
    setTimeout(() => {
      toggleForms("register");
    }, 2000);
  }
});

// Registration Form Handler
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const registerUsername = document.getElementById("registerUsername").value;
  const registerEmail = document.getElementById("registerEmail").value;
  const registerPassword = document.getElementById("registerPassword").value;

  // Check if username already exists
  const existingUser = users.find((user) => user.username === registerUsername);

  if (existingUser) {
    document.getElementById("register-message").textContent = "Username already exists!";
    document.getElementById("register-message").style.color = "red";
  } else {
    // Register new user
    users.push({ username: registerUsername, email: registerEmail, password: registerPassword });
    document.getElementById("register-message").textContent = "Registration successful!";
    document.getElementById("register-message").style.color = "green";

    // Redirect to login
    setTimeout(() => {
      toggleForms("login");
    }, 2000);
  }
});

// Add event listener for "Go to Register" button
document.getElementById("goToRegister").addEventListener("click", function () {
  toggleForms("register");
});

// Toggle between login and register forms
function toggleForms(form) {
  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");

  if (form === "login") {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
  } else if (form === "register") {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
  }
}
