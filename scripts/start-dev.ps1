# Starts Spring Boot backend and Vite frontend in separate PowerShell windows
# Usage: Right-click -> Run with PowerShell (or run: powershell -ExecutionPolicy Bypass -File .\scripts\start-dev.ps1)

$ErrorActionPreference = 'Stop'

# Resolve paths
$RepoRoot = Split-Path -Parent $PSScriptRoot
$FrontendDir = Join-Path $RepoRoot 'src\main\resources\static'

Write-Host "[start-dev] Repo root: $RepoRoot" -ForegroundColor Cyan
Write-Host "[start-dev] Frontend dir: $FrontendDir" -ForegroundColor Cyan

# Function to start a new PowerShell window and run a command, keeping it open
function Start-NewWindow {
    param(
        [Parameter(Mandatory=$true)][string]$Title,
        [Parameter(Mandatory=$true)][string]$WorkingDirectory,
        [Parameter(Mandatory=$true)][string]$Command
    )
    $escapedCommand = $Command.Replace('"','\"')
    Start-Process powershell -ArgumentList "-NoExit","-Command","Set-Location `"$WorkingDirectory`"; $escapedCommand" -WindowStyle Normal -WorkingDirectory $WorkingDirectory -Verb runAs:$false
}

# Start backend (Spring Boot)
$backendCmd = ".\mvnw.cmd spring-boot:run"
Write-Host "[start-dev] Starting backend: $backendCmd" -ForegroundColor Green
Start-NewWindow -Title "Backend 8080" -WorkingDirectory $RepoRoot -Command $backendCmd

# Prepare frontend: npm install if needed
if (-Not (Test-Path (Join-Path $FrontendDir 'node_modules'))) {
    Write-Host "[start-dev] node_modules not found. Running npm install..." -ForegroundColor Yellow
    Push-Location $FrontendDir
    try {
        npm install
    } finally {
        Pop-Location
    }
}

# Start frontend (Vite)
$frontendCmd = "npm run dev"
Write-Host "[start-dev] Starting frontend: $frontendCmd" -ForegroundColor Green
Start-NewWindow -Title "Frontend 5173" -WorkingDirectory $FrontendDir -Command $frontendCmd

Write-Host "[start-dev] Done. Access the app at http://localhost:5173" -ForegroundColor Cyan
