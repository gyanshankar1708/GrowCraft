// Enhanced Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFileUpload();
    initializeQuickContact();
    initializeBackToTop();
    initializeDateValidation();
});

// Global variables
let uploadedFiles = [];

// Initialize the main contact form
function initializeContactForm() {
    const form = document.getElementById('enhanced-contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

// Handle form submission
function handleFormSubmission() {
    const formData = collectFormData();
    
    if (!validateForm(formData)) {
        return;
    }

    showLoadingState();
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        hideLoadingState();
        showSuccessMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        resetForm();
    }, 2000);
}

// Collect all form data
function collectFormData() {
    return {
        name: document.getElementById('name')?.value.trim() || '',
        email: document.getElementById('email')?.value.trim() || '',
        phone: document.getElementById('phone')?.value.trim() || '',
        company: document.getElementById('company')?.value.trim() || '',
        serviceType: document.getElementById('service-type')?.value || '',
        budget: document.getElementById('budget')?.value || '',
        timeline: document.getElementById('timeline')?.value || '',
        preferredDate: document.getElementById('preferred-date')?.value || '',
        preferredTime: document.getElementById('preferred-time')?.value || '',
        message: document.getElementById('message')?.value.trim() || '',
        contactMethod: document.querySelector('input[name="contact-method"]:checked')?.value || 'email',
        files: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    };
}

// Validate form data
function validateForm(data) {
    const errors = [];

    // Required field validation
    if (!data.name) errors.push('Name is required');
    if (!data.email) errors.push('Email is required');
    if (!data.serviceType) errors.push('Please select a service type');
    if (!data.message) errors.push('Project details are required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }

    // Phone validation (if provided)
    if (data.phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
            errors.push('Please enter a valid phone number');
        }
    }

    // Message length validation
    if (data.message && data.message.length < 10) {
        errors.push('Project details should be at least 10 characters long');
    }

    if (errors.length > 0) {
        showErrorMessage(errors.join('. '));
        return false;
    }

    clearMessages();
    return true;
}

// File upload functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('file-upload');
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileList = document.getElementById('file-list');

    if (!fileInput || !fileUploadArea || !fileList) return;

    // Handle file input change
    fileInput.addEventListener('change', function(e) {
        handleFileSelection(Array.from(e.target.files));
        e.target.value = ''; // Reset input
    });

    // Handle drag and drop
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#0078FF';
        fileUploadArea.style.backgroundColor = '#f0f8ff';
    });

    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#ddd';
        fileUploadArea.style.backgroundColor = '#fafafa';
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#ddd';
        fileUploadArea.style.backgroundColor = '#fafafa';
        
        const files = Array.from(e.dataTransfer.files);
        handleFileSelection(files);
    });
}

// Handle file selection
function handleFileSelection(files) {
    files.forEach(file => {
        // File size validation (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            showErrorMessage(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return;
        }

        // File type validation
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif'
        ];

        if (!allowedTypes.includes(file.type)) {
            showErrorMessage(`File "${file.name}" is not a supported format.`);
            return;
        }

        // Check for duplicates
        if (uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
            showErrorMessage(`File "${file.name}" is already uploaded.`);
            return;
        }

        uploadedFiles.push(file);
        displayFile(file);
    });
}

// Display uploaded file
function displayFile(file) {
    const fileList = document.getElementById('file-list');
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.dataset.fileName = file.name;
    
    fileItem.innerHTML = `
        <span>${file.name} (${formatFileSize(file.size)})</span>
        <span class="file-remove" onclick="removeFile('${file.name}')">&times;</span>
    `;
    
    fileList.appendChild(fileItem);
}

// Remove uploaded file
function removeFile(fileName) {
    uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
    
    const fileItem = document.querySelector(`[data-file-name="${fileName}"]`);
    if (fileItem) {
        fileItem.remove();
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Initialize quick contact buttons
function initializeQuickContact() {
    const whatsappBtn = document.getElementById('whatsapp-quick');
    const telegramBtn = document.getElementById('telegram-quick');
    const callBtn = document.getElementById('call-quick');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            openWhatsApp();
        });
    }

    if (telegramBtn) {
        telegramBtn.addEventListener('click', function() {
            openTelegram();
        });
    }

    if (callBtn) {
        callBtn.addEventListener('click', function() {
            window.open('tel:+919999999999', '_self');
        });
    }
}

// Open WhatsApp chat
function openWhatsApp() {
    const name = document.getElementById('name')?.value.trim() || '';
    const service = document.getElementById('service-type')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';
    
    let whatsappMessage = `Hi! I'm ${name || 'interested in your services'}`;
    
    if (service) {
        const serviceText = service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        whatsappMessage += ` and I need help with ${serviceText}`;
    }
    
    if (message) {
        whatsappMessage += `. Here are more details: ${message}`;
    }
    
    whatsappMessage += `\n\nI found you through your website.`;
    
    // Replace with your actual WhatsApp business number
    const phoneNumber = "919999999999";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Open Telegram chat
function openTelegram() {
    const name = document.getElementById('name')?.value.trim() || '';
    const service = document.getElementById('service-type')?.value || '';
    
    let telegramMessage = `Hi! I'm ${name || 'interested in your services'}`;
    
    if (service) {
        const serviceText = service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        telegramMessage += ` and I need help with ${serviceText}`;
    }
    
    telegramMessage += `. I'd like to discuss my project with you.`;
    
    // Replace with your actual Telegram username or bot
    const telegramUsername = "growcraft_support"; // Replace with your Telegram username
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;
    window.open(telegramUrl, '_blank');
}

// Initialize date validation
function initializeDateValidation() {
    const dateInput = document.getElementById('preferred-date');
    if (!dateInput) return;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

    dateInput.addEventListener('change', function(e) {
        const selectedDate = new Date(e.target.value);
        const day = selectedDate.getDay();
        
        // Check if it's a weekend (0 = Sunday, 6 = Saturday)
        if (day === 0 || day === 6) {
            showErrorMessage('Please select a weekday (Monday to Friday) for consultations.');
            e.target.value = '';
            return;
        }
        
        // Update available time slots based on selected date
        updateTimeSlots(selectedDate);
    });
}

// Update time slots based on selected date
function updateTimeSlots(selectedDate) {
    const timeSelect = document.getElementById('preferred-time');
    if (!timeSelect) return;

    // For demo purposes, we'll assume all time slots are available
    // In a real application, you would fetch available slots from your backend
    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    
    Array.from(timeSelect.options).forEach((option, index) => {
        if (index === 0) return; // Skip the first "Select time slot" option
        
        if (isToday) {
            const optionTime = option.value;
            const [hours, minutes] = optionTime.split(':');
            const optionDateTime = new Date(selectedDate);
            optionDateTime.setHours(parseInt(hours), parseInt(minutes));
            
            // Disable past time slots for today
            if (optionDateTime <= now) {
                option.disabled = true;
                option.textContent += ' (Past)';
            } else {
                option.disabled = false;
                option.textContent = option.textContent.replace(' (Past)', '');
            }
        } else {
            option.disabled = false;
            option.textContent = option.textContent.replace(' (Past)', '');
        }
    });
}

// Message handling functions
function showErrorMessage(message) {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (successElement) {
        successElement.style.display = 'none';
    }
    
    // Scroll to messages
    document.getElementById('form-messages')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide after 5 seconds
    setTimeout(clearMessages, 5000);
}

function showSuccessMessage(message) {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    // Scroll to messages
    document.getElementById('form-messages')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearMessages() {
    const errorElement = document.getElementById('error-message');
    const successElement = document.getElementById('success-message');
    
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }
    
    if (successElement) {
        successElement.style.display = 'none';
        successElement.textContent = '';
    }
}

// Loading state functions
function showLoadingState() {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
            Sending...
        `;
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
            Send Message
        `;
    }
}

// Reset form
function resetForm() {
    const form = document.getElementById('enhanced-contact-form');
    if (form) {
        form.reset();
    }
    
    // Clear uploaded files
    uploadedFiles = [];
    const fileList = document.getElementById('file-list');
    if (fileList) {
        fileList.innerHTML = '';
    }
    
    // Reset date minimum
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility function to format time for display
function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Analytics tracking (optional)
function trackFormInteraction(action, data = {}) {
    // Implement your analytics tracking here
    console.log('Form interaction:', action, data);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: 'Contact Form',
    //         event_label: data.label || '',
    //         value: data.value || 0
    //     });
    // }
}

// Export functions for testing or external use
window.ContactForm = {
    openWhatsApp,
    openTelegram,
    removeFile,
    formatFileSize,
    showErrorMessage,
    showSuccessMessage,
    clearMessages
};

