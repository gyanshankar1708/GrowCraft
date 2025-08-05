# 🚀 GrowCraft Quick Start Guide

## Starting the Project

### Method 1: Full PHP Support (Recommended)
**File:** `start-growcraft.bat`

**Requirements:** PHP installed on your system

**Features:**
- ✅ Full PHP backend support
- ✅ Contact form functionality
- ✅ File upload handling
- ✅ Database connectivity

**Usage:**
1. Double-click `start-growcraft.bat`
2. The server will start at `http://localhost:8080`
3. Your default browser should automatically open to the project

**PHP Installation:**
- **Option 1:** Download PHP from [php.net](https://www.php.net/downloads)
- **Option 2:** Install XAMPP from [apachefriends.org](https://www.apachefriends.org/)

### Method 2: Static Mode
**File:** `start-growcraft-static.bat`

**Requirements:** Python (optional, falls back to direct file opening)

**Features:**
- ✅ View all static content
- ❌ Contact form won't work
- ❌ No PHP backend features

**Usage:**
1. Double-click `start-growcraft-static.bat`
2. With Python: Server at `http://localhost:8000`
3. Without Python: Opens `index.html` directly

## Troubleshooting

### "PHP is not installed or not in PATH"
1. Install PHP or XAMPP
2. Add PHP to your system PATH
3. Restart command prompt and try again

### "Python is not installed"
- The static batch file will fall back to opening the HTML file directly
- For better experience, install Python from [python.org](https://www.python.org/)

### Port Already in Use
- Stop any other web servers running on ports 8080 or 8000
- Or modify the port numbers in the batch files

## Manual Start Methods

### Using PHP (Command Line)
```cmd
cd "c:\Users\bikra\code\Github\GrowCraft"
php -S localhost:8080
```

### Using Python (Command Line)
```cmd
cd "c:\Users\bikra\code\Github\GrowCraft"
python -m http.server 8000
```

### Using Node.js (if installed)
```cmd
cd "c:\Users\bikra\code\Github\GrowCraft"
npx serve -s . -l 3000
```

## Project URLs
- **Homepage:** `http://localhost:8080` (or respective port)
- **Contact:** `http://localhost:8080/src/contact.html`
- **Blog:** `http://localhost:8080/blogListing.html`
- **Services:** Check navigation menu for all service pages

## Notes
- Press `Ctrl+C` in the command window to stop the server
- The batch files will show clear instructions and error messages
- All static assets (CSS, JS, images) are served correctly
- Both batch files include automatic error checking and user guidance
