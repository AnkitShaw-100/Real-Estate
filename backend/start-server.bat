@echo off
echo Starting Real Estate Backend Server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version
echo.

REM Check if npm dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    echo.
)

echo 🚀 Starting server...
echo.
echo If you see MongoDB connection errors:
echo   1. Make sure MongoDB is running locally
echo   2. Or update MONGODB_URI in config.env to use MongoDB Atlas
echo.

npm start
