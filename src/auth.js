// Authentication JavaScript

// Form toggle functions
function showSignupForm() {
    document.getElementById('login-form').classList.add('d-none');
    document.getElementById('signup-form').classList.remove('d-none');
}

function showLoginForm() {
    document.getElementById('signup-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
}

// Password visibility toggle
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Show success message
function showSuccessMessage(message, formId) {
    const form = document.getElementById(formId);
    let successDiv = form.querySelector('.success-message');
    
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        form.insertBefore(successDiv, form.firstChild);
    }
    
    successDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
    successDiv.classList.add('show');
    
    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 5000);
}

// Show error message
function showErrorMessage(message, fieldId) {
    const field = document.getElementById(fieldId);
    let errorDiv = field.parentNode.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i>${message}`;
    field.classList.add('is-invalid');
    field.style.borderColor = '#dc3545';
}

// Clear error message
function clearErrorMessage(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentNode.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.classList.remove('is-invalid');
    field.style.borderColor = '#e1e5e9';
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Clear previous errors
    clearErrorMessage('login-email');
    clearErrorMessage('login-password');
    
    let isValid = true;
    
    // Validate email
    if (!email) {
        showErrorMessage('Email is required', 'login-email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showErrorMessage('Please enter a valid email address', 'login-email');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showErrorMessage('Password is required', 'login-password');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate login process
        const loginBtn = event.target.querySelector('.btn-auth');
        const originalText = loginBtn.innerHTML;
        
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Signing In...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            // Store user data in localStorage (for demo purposes)
            const userData = {
                email: email,
                firstName: 'John',
                lastName: 'Doe',
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('growcraft_user', JSON.stringify(userData));
            
            showSuccessMessage('Login successful! Redirecting...', 'login-form');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }, 1500);
    }
    
    return false;
}

// Handle signup form submission
function handleSignup(event) {
    console.log('handleSignup called'); // Debug log
    event.preventDefault();
    
    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAccepted = document.getElementById('terms-agreement').checked;
    
    console.log('Form data:', { firstName, lastName, email, phone, termsAccepted }); // Debug log
    
    // Clear previous errors
    ['signup-firstname', 'signup-lastname', 'signup-email', 'signup-phone', 
     'signup-password', 'confirm-password'].forEach(id => {
        clearErrorMessage(id);
    });
    
    let isValid = true;
    
    // Validate first name
    if (!firstName) {
        showErrorMessage('First name is required', 'signup-firstname');
        isValid = false;
    } else if (firstName.length < 2) {
        showErrorMessage('First name must be at least 2 characters', 'signup-firstname');
        isValid = false;
    }
    
    // Validate last name
    if (!lastName) {
        showErrorMessage('Last name is required', 'signup-lastname');
        isValid = false;
    } else if (lastName.length < 2) {
        showErrorMessage('Last name must be at least 2 characters', 'signup-lastname');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showErrorMessage('Email is required', 'signup-email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showErrorMessage('Please enter a valid email address', 'signup-email');
        isValid = false;
    }
    
    // Validate phone (optional but if provided, should be valid)
    if (phone && !validatePhone(phone)) {
        showErrorMessage('Please enter a valid phone number', 'signup-phone');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showErrorMessage('Password is required', 'signup-password');
        isValid = false;
    } else if (!validatePassword(password)) {
        showErrorMessage('Password must be at least 8 characters with letters and numbers', 'signup-password');
        isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
        showErrorMessage('Please confirm your password', 'confirm-password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match', 'confirm-password');
        isValid = false;
    }
    
    // Validate terms agreement
    if (!termsAccepted) {
        const termsField = document.getElementById('terms-agreement');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle me-1"></i>You must accept the terms and conditions';
        termsField.closest('.custom-checkbox').appendChild(errorDiv);
        isValid = false;
    }
    
    if (isValid) {
        console.log('Validation passed, creating account...'); // Debug log
        // Simulate signup process
        const signupBtn = document.querySelector('#signup-form .btn-auth');
        const originalText = signupBtn.innerHTML;
        
        signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating Account...';
        signupBtn.disabled = true;
        
        setTimeout(() => {
            // Store user data in localStorage (for demo purposes)
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                isLoggedIn: true,
                signupTime: new Date().toISOString()
            };
            
            localStorage.setItem('growcraft_user', JSON.stringify(userData));
            console.log('User data stored:', userData); // Debug log
            
            showSuccessMessage('Account created successfully! Redirecting...', 'signup-form');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }, 2000);
    } else {
        console.log('Validation failed'); // Debug log
    }
    
    return false;
}

// Check if user is logged in and update navbar
function checkAuthStatus() {
    const userData = localStorage.getItem('growcraft_user');
    
    if (userData && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const user = JSON.parse(userData);
        updateNavbarForLoggedInUser(user);
    }
}

// Update navbar for logged in user
function updateNavbarForLoggedInUser(user) {
    const loginBtn = document.getElementById('login-btn');
    const profileSection = document.getElementById('profile-section');
    
    if (loginBtn && profileSection) {
        loginBtn.style.display = 'none';
        profileSection.style.display = 'block';
        
        // Update navbar display name
        const navbarUserName = document.getElementById('navbar-user-name');
        if (navbarUserName) {
            const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
            navbarUserName.textContent = fullName || 'User';
        }
        
        // Update dropdown user information
        const userDisplayName = document.getElementById('user-display-name');
        const userDisplayEmail = document.getElementById('user-display-email');
        
        if (userDisplayName) {
            userDisplayName.textContent = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
        }
        
        if (userDisplayEmail) {
            userDisplayEmail.textContent = user.email || 'user@example.com';
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('growcraft_user');
    
    // Show logout message
    const logoutMessage = document.createElement('div');
    logoutMessage.className = 'alert alert-success alert-dismissible fade show';
    logoutMessage.style.position = 'fixed';
    logoutMessage.style.top = '20px';
    logoutMessage.style.right = '20px';
    logoutMessage.style.zIndex = '9999';
    logoutMessage.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Logged out successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(logoutMessage);
    
    // Redirect to home page after 1 second
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check auth status on home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        checkAuthStatus();
    }
    
    // Add input event listeners to clear errors when user starts typing
    const inputs = ['login-email', 'login-password', 'signup-firstname', 'signup-lastname', 
                   'signup-email', 'signup-phone', 'signup-password', 'confirm-password'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => clearErrorMessage(inputId));
        }
    });
    
    // Clear terms error when checkbox is checked
    const termsCheckbox = document.getElementById('terms-agreement');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            const errorDiv = this.closest('.custom-checkbox').querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
        });
    }
});

// Social login functions
function loginWithGoogle() {
    console.log('Google login initiated');
    
    // Show loading state
    const googleBtn = document.querySelector('.btn-google');
    const originalText = googleBtn.innerHTML;
    googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Connecting...';
    googleBtn.disabled = true;
    
    // Simulate Google OAuth process
    setTimeout(() => {
        // Simulate successful Google login with mock data
        const googleUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            phone: '',
            provider: 'google',
            isLoggedIn: true,
            signupTime: new Date().toISOString()
        };
        
        // Store user data
        localStorage.setItem('growcraft_user', JSON.stringify(googleUser));
        
        // Show success message
        showSuccessMessage('Successfully logged in with Google! Redirecting...', 
                          document.querySelector('#login-form') ? 'login-form' : 'signup-form');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
        
    }, 2000);
}

function loginWithLinkedIn() {
    console.log('LinkedIn login initiated');
    
    // Show loading state
    const linkedinBtn = document.querySelector('.btn-linkedin');
    const originalText = linkedinBtn.innerHTML;
    linkedinBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Connecting...';
    linkedinBtn.disabled = true;
    
    // Simulate LinkedIn OAuth process
    setTimeout(() => {
        // Simulate successful LinkedIn login with mock data
        const linkedinUser = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@email.com',
            phone: '+1-555-0123',
            provider: 'linkedin',
            isLoggedIn: true,
            signupTime: new Date().toISOString()
        };
        
        // Store user data
        localStorage.setItem('growcraft_user', JSON.stringify(linkedinUser));
        
        // Show success message
        showSuccessMessage('Successfully logged in with LinkedIn! Redirecting...', 
                          document.querySelector('#login-form') ? 'login-form' : 'signup-form');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
        
    }, 2000);
}

// Function to handle real social login integration (for future use)
function initializeRealSocialLogin() {
    /* 
    For production, you would implement actual OAuth flows here:
    
    Google Login:
    - Include Google Identity Services API
    - Configure Google OAuth client
    - Handle Google ID tokens
    
    LinkedIn Login:
    - Include LinkedIn SDK
    - Configure LinkedIn app credentials
    - Handle LinkedIn authorization codes
    
    Example structure:
    
    // Google
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleGoogleResponse
    });
    
    // LinkedIn
    IN.init({
        api_key: 'YOUR_LINKEDIN_API_KEY',
        authorize: true
    });
    */
}
