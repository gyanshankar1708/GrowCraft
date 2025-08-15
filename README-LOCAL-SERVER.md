# 🚀 GrowCraft Local Server

## Quick Start

### Option 1: Double-click the batch file
1. **Double-click** `start-growcraft.bat`
2. **Wait** for the server to start
3. **Open your browser** and go to: `http://localhost:8000`
4. **Press Ctrl+C** in the terminal to stop the server

### Option 2: Run PowerShell script
1. **Right-click** `start-growcraft.ps1` → "Run with PowerShell"
2. **Wait** for the server to start
3. **Open your browser** and go to: `http://localhost:8000`
4. **Press Ctrl+C** in the terminal to stop the server

### Option 3: Manual command
1. **Open PowerShell** in this folder
2. **Run:** `py -m http.server 8000`
3. **Open your browser** and go to: `http://localhost:8000`
4. **Press Ctrl+C** in the terminal to stop the server

## 🌐 What You Can Access

- **Homepage:** http://localhost:8000/index.html
- **Contact:** http://localhost:8000/src/contact.html
- **Login:** http://localhost:8000/src/login.html
- **Services:** http://localhost:8000/learn/
- **All images and assets** are automatically served

## ✅ Features

- **Simple & Reliable** - Uses Python's built-in HTTP server
- **Auto-refresh** - Changes to files are immediately available
- **Proper MIME types** - CSS, JS, images all work correctly
- **No installation needed** - Works with Python that's already on your system

## 🛠️ Troubleshooting

**Port 8000 already in use?**
- Try a different port: `py -m http.server 8001`
- Then access: `http://localhost:8001`

**Python not found?**
- Make sure Python is installed
- Try: `python -m http.server 8000` instead

**Server won't start?**
- Check if another application is using port 8000
- Try running as administrator

## 🎯 Test Page

Visit `http://localhost:8000/test-server.html` to see a test page confirming the server is working!

---

**Happy coding! 🎉**

