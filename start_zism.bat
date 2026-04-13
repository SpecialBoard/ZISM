@echo off
title ZISM Starter
echo =========================================
echo       ZISM - Zero-Identity Protocol
echo       Automated Startup Script
echo =========================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH!
    echo Please install Python from python.org and check "Add Python to PATH".
    pause
    exit /b
)

:: Check for Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH!
    echo Please install Node from nodejs.org.
    pause
    exit /b
)

:: =========================================
:: 1. BACKEND SETUP & STARTUP
:: =========================================
echo [1/3] Initializing Backend...
cd backend

if not exist "venv\" (
    echo - Creating Python virtual environment...
    python -m venv venv
)

echo - Installing Python dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt --quiet

echo - Starting FastAPI Server...
start "ZISM Backend (FastAPI)" cmd /k "venv\Scripts\activate.bat && uvicorn main:app --reload"
cd ..

:: =========================================
:: 2. FRONTEND SETUP & STARTUP
:: =========================================
echo.
echo [2/3] Initializing Frontend...
cd frontend

if not exist "node_modules\" (
    echo - Installing Node.js dependencies (This might take a minute the first time)...
    call npm install
)

echo - Starting Vite Server...
start "ZISM Frontend (React)" cmd /k "npm run dev"
cd ..

:: =========================================
:: 3. LAUNCH BROWSER
:: =========================================
echo.
echo [3/3] Opening ZISM...
echo - Waiting a few seconds for servers to start...
timeout /t 5 /nobreak > NUL

echo - Launching default browser...
start http://localhost:5173

echo.
echo =========================================
echo BOTH SERVERS ARE RUNNING IN BACKGROUND WINDOWS.
echo To shut down ZISM, simply close the two command windows that opened.
echo =========================================
pause
