<?php
/**
 * Enhanced Contact Form Handler
 * Handles form submissions with file uploads, calendar booking, and messaging integration
 */

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Configuration
$config = [
    'max_file_size' => 10 * 1024 * 1024, // 10MB
    'allowed_file_types' => ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'],
    'upload_directory' => 'uploads/',
    'admin_email' => 'info@growcraft.com',
    'from_email' => 'noreply@growcraft.com',
    'smtp_host' => 'localhost', // Configure your SMTP settings
    'smtp_port' => 587,
    'smtp_username' => '',
    'smtp_password' => '',
];

try {
    // Get form data
    $formData = [
        'name' => trim($_POST['name'] ?? ''),
        'email' => trim($_POST['email'] ?? ''),
        'phone' => trim($_POST['phone'] ?? ''),
        'company' => trim($_POST['company'] ?? ''),
        'service_type' => $_POST['service-type'] ?? '',
        'budget' => $_POST['budget'] ?? '',
        'timeline' => $_POST['timeline'] ?? '',
        'preferred_date' => $_POST['preferred-date'] ?? '',
        'preferred_time' => $_POST['preferred-time'] ?? '',
        'message' => trim($_POST['message'] ?? ''),
        'contact_method' => $_POST['contact-method'] ?? 'email',
    ];

    // Validate required fields
    $errors = validateFormData($formData);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['error' => implode('. ', $errors)]);
        exit;
    }

    // Handle file uploads
    $uploadedFiles = [];
    if (isset($_FILES['files']) && !empty($_FILES['files']['name'][0])) {
        $uploadedFiles = handleFileUploads($_FILES['files'], $config);
        if (isset($uploadedFiles['error'])) {
            http_response_code(400);
            echo json_encode(['error' => $uploadedFiles['error']]);
            exit;
        }
    }

    // Save to database (optional)
    $contactId = saveToDatabase($formData, $uploadedFiles);

    // Send email notifications
    $emailSent = sendEmailNotifications($formData, $uploadedFiles, $config);

    // Send auto-reply to customer
    sendAutoReply($formData, $config);

    // Prepare calendar event (if consultation is requested)
    $calendarEvent = null;
    if (!empty($formData['preferred_date']) && !empty($formData['preferred_time'])) {
        $calendarEvent = createCalendarEvent($formData);
    }

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
        'contact_id' => $contactId,
        'files_uploaded' => count($uploadedFiles),
        'calendar_event' => $calendarEvent
    ]);

} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while processing your request. Please try again.']);
}

/**
 * Validate form data
 */
function validateFormData($data) {
    $errors = [];

    // Required fields
    if (empty($data['name'])) $errors[] = 'Name is required';
    if (empty($data['email'])) $errors[] = 'Email is required';
    if (empty($data['service_type'])) $errors[] = 'Service type is required';
    if (empty($data['message'])) $errors[] = 'Message is required';

    // Email validation
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email address';
    }

    // Phone validation (if provided)
    if (!empty($data['phone'])) {
        $phone = preg_replace('/[^0-9+]/', '', $data['phone']);
        if (strlen($phone) < 10) {
            $errors[] = 'Invalid phone number';
        }
    }

    // Message length
    if (!empty($data['message']) && strlen($data['message']) < 10) {
        $errors[] = 'Message must be at least 10 characters long';
    }

    return $errors;
}

/**
 * Handle file uploads
 */
function handleFileUploads($files, $config) {
    $uploadedFiles = [];
    $uploadDir = $config['upload_directory'];

    // Create upload directory if it doesn't exist
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            return ['error' => 'Failed to create upload directory'];
        }
    }

    $fileCount = count($files['name']);
    for ($i = 0; $i < $fileCount; $i++) {
        if ($files['error'][$i] !== UPLOAD_ERR_OK) {
            continue;
        }

        $fileName = $files['name'][$i];
        $fileTmpName = $files['tmp_name'][$i];
        $fileSize = $files['size'][$i];
        $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Validate file size
        if ($fileSize > $config['max_file_size']) {
            return ['error' => "File '{$fileName}' is too large. Maximum size is 10MB."];
        }

        // Validate file type
        if (!in_array($fileType, $config['allowed_file_types'])) {
            return ['error' => "File '{$fileName}' has an unsupported format."];
        }

        // Generate unique filename
        $uniqueFileName = time() . '_' . uniqid() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $fileName);
        $uploadPath = $uploadDir . $uniqueFileName;

        // Move uploaded file
        if (move_uploaded_file($fileTmpName, $uploadPath)) {
            $uploadedFiles[] = [
                'original_name' => $fileName,
                'stored_name' => $uniqueFileName,
                'file_path' => $uploadPath,
                'file_size' => $fileSize,
                'file_type' => $fileType
            ];
        } else {
            return ['error' => "Failed to upload file '{$fileName}'"];
        }
    }

    return $uploadedFiles;
}

/**
 * Save contact data to database
 */
function saveToDatabase($formData, $uploadedFiles) {
    try {
        // Database configuration
        $dsn = "mysql:host=localhost;dbname=growcraft;charset=utf8mb4";
        $username = "your_db_username";
        $password = "your_db_password";

        $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        // Insert contact record
        $sql = "INSERT INTO contacts (
            name, email, phone, company, service_type, budget, timeline,
            preferred_date, preferred_time, message, contact_method, 
            files_json, created_at, status
        ) VALUES (
            :name, :email, :phone, :company, :service_type, :budget, :timeline,
            :preferred_date, :preferred_time, :message, :contact_method,
            :files_json, NOW(), 'new'
        )";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'name' => $formData['name'],
            'email' => $formData['email'],
            'phone' => $formData['phone'],
            'company' => $formData['company'],
            'service_type' => $formData['service_type'],
            'budget' => $formData['budget'],
            'timeline' => $formData['timeline'],
            'preferred_date' => $formData['preferred_date'] ?: null,
            'preferred_time' => $formData['preferred_time'] ?: null,
            'message' => $formData['message'],
            'contact_method' => $formData['contact_method'],
            'files_json' => json_encode($uploadedFiles)
        ]);

        return $pdo->lastInsertId();
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return null;
    }
}

/**
 * Send email notifications
 */
function sendEmailNotifications($formData, $uploadedFiles, $config) {
    $subject = "New Contact Form Submission - " . $formData['service_type'];
    
    $emailBody = generateEmailBody($formData, $uploadedFiles);
    
    // Send email using PHP mail() or SMTP
    $headers = [
        'From: ' . $config['from_email'],
        'Reply-To: ' . $formData['email'],
        'Content-Type: text/html; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    ];

    return mail($config['admin_email'], $subject, $emailBody, implode("\r\n", $headers));
}

/**
 * Generate email body
 */
function generateEmailBody($formData, $uploadedFiles) {
    ob_start();
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0078FF; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; }
            .files { background: white; padding: 15px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value"><?= htmlspecialchars($formData['name']) ?></div>
                </div>
                
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><?= htmlspecialchars($formData['email']) ?></div>
                </div>
                
                <?php if ($formData['phone']): ?>
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value"><?= htmlspecialchars($formData['phone']) ?></div>
                </div>
                <?php endif; ?>
                
                <?php if ($formData['company']): ?>
                <div class="field">
                    <div class="label">Company:</div>
                    <div class="value"><?= htmlspecialchars($formData['company']) ?></div>
                </div>
                <?php endif; ?>
                
                <div class="field">
                    <div class="label">Service Interest:</div>
                    <div class="value"><?= ucfirst(str_replace('-', ' ', $formData['service_type'])) ?></div>
                </div>
                
                <?php if ($formData['budget']): ?>
                <div class="field">
                    <div class="label">Budget:</div>
                    <div class="value"><?= htmlspecialchars($formData['budget']) ?></div>
                </div>
                <?php endif; ?>
                
                <?php if ($formData['timeline']): ?>
                <div class="field">
                    <div class="label">Timeline:</div>
                    <div class="value"><?= htmlspecialchars($formData['timeline']) ?></div>
                </div>
                <?php endif; ?>
                
                <?php if ($formData['preferred_date'] && $formData['preferred_time']): ?>
                <div class="field">
                    <div class="label">Preferred Consultation:</div>
                    <div class="value"><?= date('F j, Y', strtotime($formData['preferred_date'])) ?> at <?= date('g:i A', strtotime($formData['preferred_time'])) ?></div>
                </div>
                <?php endif; ?>
                
                <div class="field">
                    <div class="label">Preferred Contact Method:</div>
                    <div class="value"><?= ucfirst($formData['contact_method']) ?></div>
                </div>
                
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="value"><?= nl2br(htmlspecialchars($formData['message'])) ?></div>
                </div>
                
                <?php if (!empty($uploadedFiles)): ?>
                <div class="field">
                    <div class="label">Uploaded Files:</div>
                    <div class="files">
                        <?php foreach ($uploadedFiles as $file): ?>
                            <div><?= htmlspecialchars($file['original_name']) ?> (<?= formatBytes($file['file_size']) ?>)</div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>
                
                <div class="field">
                    <div class="label">Submitted:</div>
                    <div class="value"><?= date('F j, Y g:i A') ?></div>
                </div>
            </div>
        </div>
    </body>
    </html>
    <?php
    return ob_get_clean();
}

/**
 * Send auto-reply to customer
 */
function sendAutoReply($formData, $config) {
    $subject = "Thank you for contacting GrowCraft - We'll be in touch soon!";
    
    $replyBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0078FF; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You for Contacting GrowCraft!</h2>
            </div>
            <div class='content'>
                <p>Dear " . htmlspecialchars($formData['name']) . ",</p>
                
                <p>Thank you for reaching out to us! We have received your inquiry about <strong>" . ucfirst(str_replace('-', ' ', $formData['service_type'])) . "</strong> and appreciate your interest in our services.</p>
                
                <p>Here's what happens next:</p>
                <ul>
                    <li>Our team will review your requirements within 24 hours</li>
                    <li>We'll get back to you via your preferred contact method: <strong>" . ucfirst($formData['contact_method']) . "</strong></li>
                    <li>If you requested a consultation, we'll confirm your preferred time slot</li>
                </ul>
                
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li>Visit our website to learn more about our services</li>
                    <li>Follow us on social media for updates and tips</li>
                    <li>Contact us directly for urgent inquiries: +91 999 999 999</li>
                </ul>
                
                <p>We're excited to help grow your business!</p>
                
                <p>Best regards,<br>
                The GrowCraft Team<br>
                info@growcraft.com<br>
                +91 999 999 999</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'From: ' . $config['from_email'],
        'Content-Type: text/html; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    ];

    return mail($formData['email'], $subject, $replyBody, implode("\r\n", $headers));
}

/**
 * Create calendar event data
 */
function createCalendarEvent($formData) {
    if (empty($formData['preferred_date']) || empty($formData['preferred_time'])) {
        return null;
    }

    $startDateTime = $formData['preferred_date'] . 'T' . $formData['preferred_time'] . ':00';
    $endDateTime = date('Y-m-d\TH:i:s', strtotime($startDateTime . ' +1 hour'));

    return [
        'title' => 'Consultation - ' . $formData['name'],
        'start' => $startDateTime,
        'end' => $endDateTime,
        'description' => "Consultation for " . $formData['service_type'] . "\n\nClient: " . $formData['name'] . "\nEmail: " . $formData['email'] . "\nPhone: " . $formData['phone'],
        'location' => 'Online/Office'
    ];
}

/**
 * Format bytes to human readable format
 */
function formatBytes($size, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    $base = log($size, 1024);
    return round(pow(1024, $base - floor($base)), $precision) . ' ' . $units[floor($base)];
}
?>
