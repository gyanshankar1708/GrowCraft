-- Database schema for GrowCraft Contact Form
-- Create this database schema to store contact form submissions

CREATE DATABASE IF NOT EXISTS growcraft;
USE growcraft;

-- Contacts table to store form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_type VARCHAR(100) NOT NULL,
    budget VARCHAR(50),
    timeline VARCHAR(50),
    preferred_date DATE,
    preferred_time TIME,
    message TEXT NOT NULL,
    contact_method ENUM('email', 'phone', 'whatsapp', 'telegram') DEFAULT 'email',
    files_json JSON,
    status ENUM('new', 'in_progress', 'responded', 'completed', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_service_type (service_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_preferred_date (preferred_date)
);

-- Files table to store uploaded file information
CREATE TABLE IF NOT EXISTS contact_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    INDEX idx_contact_id (contact_id)
);

-- Calendar bookings table for consultation scheduling
CREATE TABLE IF NOT EXISTS calendar_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration INT DEFAULT 60, -- in minutes
    status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled') DEFAULT 'pending',
    meeting_type ENUM('online', 'office', 'phone') DEFAULT 'online',
    meeting_link VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status),
    UNIQUE KEY unique_booking (booking_date, booking_time)
);

-- Communication log table to track all interactions
CREATE TABLE IF NOT EXISTS communication_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    communication_type ENUM('email', 'phone', 'whatsapp', 'telegram', 'meeting') NOT NULL,
    direction ENUM('inbound', 'outbound') NOT NULL,
    subject VARCHAR(255),
    message TEXT,
    status ENUM('sent', 'delivered', 'read', 'replied', 'failed') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    INDEX idx_contact_id (contact_id),
    INDEX idx_communication_type (communication_type),
    INDEX idx_created_at (created_at)
);

-- Settings table for application configuration
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('business_hours_start', '09:00', 'Business hours start time'),
('business_hours_end', '18:00', 'Business hours end time'),
('working_days', 'monday,tuesday,wednesday,thursday,friday', 'Working days of the week'),
('max_file_size', '10485760', 'Maximum file upload size in bytes (10MB)'),
('allowed_file_types', 'pdf,doc,docx,jpg,jpeg,png,gif', 'Allowed file extensions'),
('whatsapp_number', '919999999999', 'WhatsApp business number'),
('telegram_username', 'growcraft_support', 'Telegram username or bot'),
('admin_email', 'info@growcraft.com', 'Admin email for notifications'),
('auto_reply_enabled', '1', 'Enable auto-reply emails'),
('booking_advance_days', '90', 'How many days in advance bookings can be made');

-- Create views for easier data access
CREATE VIEW contact_summary AS
SELECT 
    c.id,
    c.name,
    c.email,
    c.phone,
    c.company,
    c.service_type,
    c.status,
    c.created_at,
    cb.booking_date,
    cb.booking_time,
    cb.status AS booking_status,
    JSON_LENGTH(c.files_json) AS file_count
FROM contacts c
LEFT JOIN calendar_bookings cb ON c.id = cb.contact_id
ORDER BY c.created_at DESC;

-- Create view for pending bookings
CREATE VIEW pending_bookings AS
SELECT 
    cb.id AS booking_id,
    cb.booking_date,
    cb.booking_time,
    cb.duration,
    c.name,
    c.email,
    c.phone,
    c.service_type,
    c.message
FROM calendar_bookings cb
JOIN contacts c ON cb.contact_id = c.id
WHERE cb.status = 'pending'
AND cb.booking_date >= CURDATE()
ORDER BY cb.booking_date, cb.booking_time;

-- Triggers for automatic updates
DELIMITER //

-- Trigger to update contact status when booking is confirmed
CREATE TRIGGER update_contact_on_booking_confirm
AFTER UPDATE ON calendar_bookings
FOR EACH ROW
BEGIN
    IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
        UPDATE contacts 
        SET status = 'in_progress' 
        WHERE id = NEW.contact_id AND status = 'new';
    END IF;
END //

-- Trigger to log communication when contact is created
CREATE TRIGGER log_initial_contact
AFTER INSERT ON contacts
FOR EACH ROW
BEGIN
    INSERT INTO communication_log (contact_id, communication_type, direction, subject, message)
    VALUES (NEW.id, 'email', 'inbound', 'Initial Contact Form Submission', NEW.message);
END //

DELIMITER ;

-- Sample queries for common operations

-- Get all contacts from last 30 days
-- SELECT * FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Get contacts by service type
-- SELECT * FROM contacts WHERE service_type = 'web-development';

-- Get upcoming bookings for next 7 days
-- SELECT * FROM pending_bookings WHERE booking_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY);

-- Get contact statistics by service type
-- SELECT service_type, COUNT(*) as total_inquiries FROM contacts GROUP BY service_type;

-- Get monthly contact trends
-- SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as inquiries FROM contacts GROUP BY month ORDER BY month DESC;

-- Grant permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON growcraft.* TO 'growcraft_user'@'localhost';
-- FLUSH PRIVILEGES;
