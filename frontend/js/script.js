
        // JavaScript code for login functionality

        document.addEventListener('DOMContentLoaded', () => {
            // Load the Google API
            google.accounts.id.initialize({
                client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google client ID
                callback: handleCredentialResponse,
            });
        
            // Render the button
            google.accounts.id.renderButton(
                document.getElementById("google-signin-button"),
                {
                    theme: "outline",
                    size: "large", // Options: small, medium, large
                    shape: "rectangular", // Options: rectangular, pill, circle
                    width: "350", // Explicitly set width (optional)
                    
                }
            );
            
        
            // Automatically prompt the user
            google.accounts.id.prompt();
        
            // Handle Google sign-in response
            function handleCredentialResponse(response) {
                // Token received from Google
                console.log("Google Credential: ", response.credential);
        
                // Decode the credential token (use JWT library if needed)
                // Redirect or process the user based on the response
                alert("Google sign-in successful!");
            }
        });

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const username = loginForm.querySelector('input[type="text"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        if (!username || !password) {
            alert('Please fill in both username and password.');
            return;
        }

        // Simulate login verification (replace with actual API call as needed)
        if (username === 'admin' && password === 'password123') {
            alert('Login successful! Redirecting to the dashboard.');
            window.location.href = 'dashboard.html'; // Replace with actual redirect URL
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Add functionality for "Forgot Password?" link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link action
        alert('Redirecting to password recovery page.');
        window.location.href = 'forgot-password.html'; // Replace with actual recovery page URL
    });

    // Add functionality for "Back to Home" link
    const backToHomeLink = document.querySelector('.back-to-home a');
    backToHomeLink.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Returning to the home page.');
        window.location.href = 'index.html'; // Replace with actual home page URL
    });
});


