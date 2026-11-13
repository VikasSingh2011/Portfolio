@echo off
title Vikas Singh Portfolio Launcher
echo ========================================================
echo   Starting Vikas Singh's Developer Portfolio
echo ========================================================
echo.
echo 1. Starting Backend API Server (Port 5000)...
start "Portfolio Backend" cmd /k "node server/server.js"

echo 2. Starting Frontend Vite Dev Server (Port 3000)...
start "Portfolio Frontend" cmd /k "npm run dev"

echo.
echo Waiting 3 seconds for servers to initialize...
timeout /t 3 >nul

echo Opening portfolio in browser: http://localhost:3000
start http://localhost:3000

echo ========================================================
echo   Portfolio is now live!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000/api/health
echo ========================================================
pause

