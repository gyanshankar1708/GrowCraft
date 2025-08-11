# Enhanced Contact Page Documentation

## Overview
A comprehensive contact page with advanced features including file uploads, calendar booking system, and instant messaging integration (WhatsApp/Telegram).

## Features

### ✅ **Enhanced Contact Form**
- **Multi-step Information Collection**: Basic info, service details, budget, timeline
- **Smart Validation**: Real-time form validation with detailed error messages
- **Contact Method Preferences**: Email, Phone, WhatsApp, Telegram options
- **Professional UI/UX**: Modern design with smooth animations

### ✅ **File Upload System**
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Multiple File Support**: Upload multiple documents/images simultaneously
- **File Validation**: 
  - Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF
  - Size limit: 10MB per file
  - Type validation and duplicate detection
- **File Management**: Preview uploaded files with remove option

### ✅ **Calendar Booking System**
- **Date Selection**: Smart date picker with business day validation
- **Time Slots**: Pre-defined 30-minute consultation slots
- **Business Hours**: 9:00 AM - 6:00 PM, Monday-Friday
- **Real-time Availability**: Past dates and times automatically disabled
- **Calendar Integration Ready**: Structured for Google Calendar API integration

### ✅ **Instant Messaging Integration**
- **WhatsApp Integration**: 
  - Quick WhatsApp button for immediate contact
  - Auto-generated messages with form data
  - Direct link to WhatsApp Business
- **Telegram Integration**:
  - Telegram chat button
  - Pre-filled messages with inquiry details
  - Customizable Telegram username/bot

### ✅ **Quick Contact Features**
- **Contact Information Cards**: Office address, phone, email with visual icons
- **Office Hours Display**: Clear business hours and availability
- **Response Time Indicator**: Sets proper expectations for customers
- **One-click Actions**: Direct phone calling, messaging

## File Structure

```
contact.html           # Main contact page
src/
├── contact.css        # Contact page specific styles
├── contact.js         # Enhanced JavaScript functionality
└── style.css          # Shared styles from main site

contact-handler.php    # Backend form processing
database_schema.sql    # Database setup for storing submissions
```

## Setup Instructions

### 1. **Basic Setup**
1. Ensure `contact.html` is accessible from your navigation
2. Update navigation links in `index.html` to point to `contact.html`
3. Verify all CSS and JS files are properly linked

### 2. **WhatsApp Configuration**
Update the WhatsApp number in `src/contact.js`:
```javascript
const phoneNumber = "919999999999"; // Replace with your WhatsApp Business number
```

### 3. **Telegram Configuration**
Update the Telegram username in `src/contact.js`:
```javascript
const telegramUsername = "growcraft_support"; // Replace with your Telegram username
```

### 4. **Backend Setup (Optional)**
If using the PHP backend:
1. Upload `contact-handler.php` to your server
2. Update email configuration in the PHP file
3. Set up database using `database_schema.sql`
4. Configure SMTP settings for email notifications

### 5. **Database Setup (Optional)**
```sql
-- Import the database schema
mysql -u username -p growcraft < database_schema.sql

-- Update configuration
UPDATE settings SET setting_value = 'your_whatsapp_number' WHERE setting_key = 'whatsapp_number';
UPDATE settings SET setting_value = 'your_telegram_username' WHERE setting_key = 'telegram_username';
UPDATE settings SET setting_value = 'your_admin_email' WHERE setting_key = 'admin_email';
```

## Customization Options

### **Business Hours**
Modify business hours in `src/contact.js`:
```javascript
// Update time slots in the initializeDateValidation function
const businessHours = {
    start: '09:00',
    end: '18:00',
    workingDays: [1, 2, 3, 4, 5] // Monday to Friday
};
```

### **File Upload Limits**
Adjust file upload restrictions:
```javascript
// In handleFileSelection function
const maxFileSize = 10 * 1024 * 1024; // 10MB
const allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
```

### **Form Fields**
Add or modify form fields by:
1. Adding HTML input elements in `contact.html`
2. Updating validation in `collectFormData()` function
3. Adding backend processing in `contact-handler.php`

### **Styling**
Customize colors and appearance in `src/contact.css`:
```css
:root {
    --primary-color: #0078FF;
    --secondary-color: #0066cc;
    --success-color: #28a745;
    --error-color: #dc3545;
}
```

## Integration Examples

### **Google Calendar API Integration**
```javascript
// Add to contact.js
async function createGoogleCalendarEvent(bookingData) {
    const event = {
        summary: `Consultation - ${bookingData.name}`,
        start: {
            dateTime: `${bookingData.date}T${bookingData.time}:00`,
            timeZone: 'Asia/Kolkata'
        },
        end: {
            dateTime: `${bookingData.date}T${addHour(bookingData.time)}:00`,
            timeZone: 'Asia/Kolkata'
        },
        description: `Service: ${bookingData.service}\nEmail: ${bookingData.email}`
    };
    
    // Google Calendar API call
    const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
    });
    
    return response;
}
```

### **Email Service Integration (EmailJS)**
```javascript
// Add EmailJS for client-side email sending
function sendEmailNotification(formData) {
    emailjs.send('service_id', 'template_id', {
        to_name: 'GrowCraft Team',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        service_type: formData.serviceType
    }).then(function(response) {
        console.log('Email sent successfully:', response);
    }, function(error) {
        console.error('Email sending failed:', error);
    });
}
```

## Browser Compatibility
- **Modern Browsers**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **Mobile Support**: iOS Safari 12+, Chrome Mobile 70+
- **Fallbacks**: Graceful degradation for older browsers

## Performance Optimization

### **Image Optimization**
- Use WebP format for images where supported
- Implement lazy loading for non-critical images
- Compress images to reduce load times

### **JavaScript Optimization**
```javascript
// Lazy load non-critical features
const loadAdvancedFeatures = () => {
    import('./advanced-calendar.js').then(module => {
        module.initAdvancedCalendar();
    });
};

// Load on user interaction
document.addEventListener('click', loadAdvancedFeatures, { once: true });
```

### **CSS Optimization**
- Critical CSS inlined in HTML head
- Non-critical CSS loaded asynchronously
- Use CSS Grid and Flexbox for responsive layouts

## Security Considerations

### **File Upload Security**
- Server-side file type validation
- Virus scanning for uploaded files
- Store files outside web directory
- Generate unique filenames to prevent conflicts

### **Form Security**
- CSRF protection for form submissions
- Input sanitization and validation
- Rate limiting to prevent spam
- Honeypot fields for bot detection

### **Data Protection**
- HTTPS enforcement for all communications
- Data encryption for sensitive information
- GDPR compliance for EU users
- Regular security audits

## Testing Checklist

### **Functionality Testing**
- [ ] Form submission with all field combinations
- [ ] File upload with various file types and sizes
- [ ] Date/time selection validation
- [ ] WhatsApp/Telegram integration
- [ ] Email notifications
- [ ] Error handling and validation messages

### **Responsive Testing**
- [ ] Mobile devices (iOS/Android)
- [ ] Tablets (iPad/Android tablets)
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Different screen sizes and orientations

### **Accessibility Testing**
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Focus indicators and ARIA labels

## Troubleshooting

### **Common Issues**

**File Upload Not Working**
- Check server file upload limits in `php.ini`
- Verify folder permissions for upload directory
- Ensure file size limits are properly configured

**WhatsApp/Telegram Links Not Opening**
- Verify phone number format (country code + number)
- Check URL encoding for special characters
- Test on different devices and browsers

**Form Validation Errors**
- Check JavaScript console for errors
- Verify all required fields are properly defined
- Ensure email regex patterns are correct

**Styling Issues**
- Clear browser cache
- Check CSS file paths and loading
- Verify responsive breakpoints

## Future Enhancements

### **Planned Features**
1. **Advanced Calendar Integration**
   - Google Calendar API integration
   - Outlook Calendar support
   - Automatic meeting links generation

2. **Enhanced Communication**
   - Live chat integration
   - Video call scheduling
   - SMS notifications

3. **Analytics and Reporting**
   - Form submission analytics
   - Conversion tracking
   - Response time metrics

4. **CRM Integration**
   - HubSpot integration
   - Salesforce connectivity
   - Lead scoring system

## Support and Maintenance

### **Regular Maintenance Tasks**
- Monitor form submission rates
- Update file upload limits as needed
- Review and respond to inquiries promptly
- Test integrations monthly
- Update contact information when needed

### **Monitoring**
- Set up form submission notifications
- Monitor server logs for errors
- Track file upload usage
- Review user feedback regularly

For technical support or questions about implementation, contact the development team or refer to the inline code comments for detailed explanations.
