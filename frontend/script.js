document.addEventListener("DOMContentLoaded", () => {
    // Selecting elements
    const form = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const loginButton = document.querySelector(".login-button");
    const googleButton = document.querySelector(".google-button");
  
    // Helper function to display error messages
    function displayError(message) {
      const existingError = document.querySelector(".error-message");
      if (existingError) {
        existingError.textContent = message;
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = message;
        errorMessage.className = "error-message";
        errorMessage.style.color = "red";
        errorMessage.style.marginTop = "10px";
        form.appendChild(errorMessage);
      }
    }
  
    // Function to handle form submission (email/password login)
    async function handleFormLogin(event) {
      event.preventDefault(); // Prevent default form submission
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Input validation
      if (!email || !password) {
        displayError("Both email and password are required.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);
  
          // Redirect based on role
          const role = data.user.role; 
          let redirectUrl;
          switch (role) {
            case "participant":
              redirectUrl = `participantsDashboard.html?username=${data.user.username}`;
              break;
            case "admin":
              redirectUrl = `adminDashboard.html?username=${data.user.username}`;
              break;
            case "organiser":
              redirectUrl = `organiserDashboard.html?username=${data.user.username}`;
              break;
            default:
              console.error("Unknown role:", role);
              displayError("Invalid user role.");
              return;
          }
  
          // Store token in local storage (optional)
          localStorage.setItem("token", data.token); 
  
          window.location.href = redirectUrl;
        } else {
          // Handle HTTP errors
          const errorData = await response.json();
          displayError(errorData.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        displayError("An error occurred. Please try again later.");
      }
    }
  
    // Function to handle Google login (placeholder for now)
    function handleGoogleLogin() {
      // Replace with actual Google OAuth2 implementation
      console.log("Google login clicked. Implement Google OAuth2 logic here.");
      // For demonstration purposes:
      // window.location.href = "googleLogin.html"; // Placeholder for Google login page
    }
  
    // Event listeners
    form.addEventListener("submit", handleFormLogin);
    googleButton.addEventListener("click", handleGoogleLogin);
  
    // Optional: Add live validation for email and password inputs
    emailInput.addEventListener("input", () => {
      const error = document.querySelector(".error-message");
      if (error) error.remove();
    });
  
    passwordInput.addEventListener("input", () => {
      const error = document.querySelector(".error-message");
      if (error) error.remove();
    });
  });