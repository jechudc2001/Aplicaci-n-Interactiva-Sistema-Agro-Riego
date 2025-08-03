# Script PowerShell para Testing con Docker

# Colores para output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

Write-Host "🧪 SISTEMA DE TESTING Y DEBUGGING CON DOCKER" -ForegroundColor $Blue
Write-Host "============================================" -ForegroundColor $Blue
Write-Host ""

# Función para mostrar el menú
function Show-Menu {
    Write-Host "📋 OPCIONES DISPONIBLES:" -ForegroundColor $Yellow
    Write-Host "1. 🔧 Debugging de Base de Datos"
    Write-Host "2. 🧪 Tests de Controllers (Prisma)"
    Write-Host "3. 🌐 Tests de Endpoints de API"
    Write-Host "4. 🚀 Ejecutar TODOS los tests"
    Write-Host "5. 🐳 Iniciar/Detener servicios Docker"
    Write-Host "6. ❌ Salir"
    Write-Host ""
    Write-Host "Selecciona una opción (1-6):" -ForegroundColor $White
}

# Función para verificar si Docker está corriendo
function Test-Docker {
    try {
        docker info | Out-Null
        return $true
    }
    catch {
        Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor $Red
        return $false
    }
}

# Función para verificar si los servicios están corriendo
function Test-Services {
    $services = docker-compose ps
    if ($services -match "Up") {
        Write-Host "✅ Servicios Docker ya están corriendo." -ForegroundColor $Green
        return $true
    }
    else {
        Write-Host "⚠️  Los servicios Docker no están corriendo." -ForegroundColor $Yellow
        Write-Host "Iniciando servicios..." -ForegroundColor $Blue
        docker-compose up -d
        Write-Host "✅ Servicios iniciados. Esperando 10 segundos para que estén listos..." -ForegroundColor $Green
        Start-Sleep -Seconds 10
        return $true
    }
}

# Función para debugging de base de datos
function Start-DatabaseDebug {
    Write-Host ""
    Write-Host "🔧 Iniciando debugging de base de datos..." -ForegroundColor $Blue
    Write-Host ""
    docker-compose exec backend npm run debug:db
}

# Función para tests de controllers
function Start-ControllerTests {
    Write-Host ""
    Write-Host "🧪 Iniciando tests de controllers..." -ForegroundColor $Blue
    Write-Host ""
    docker-compose exec backend npm run test:controllers
}

# Función para tests de API
function Start-ApiTests {
    Write-Host ""
    Write-Host "🌐 Iniciando tests de endpoints de API..." -ForegroundColor $Blue
    Write-Host ""
    Write-Host "⚠️  Verificando que el servidor esté listo..." -ForegroundColor $Yellow
    
    # Esperar a que el servidor esté listo
    for ($i = 1; $i -le 30; $i++) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000/api/parcelas" -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Servidor listo!" -ForegroundColor $Green
                break
            }
        }
        catch {
            Write-Host "⏳ Esperando servidor... ($i/30)" -ForegroundColor $Yellow
            Start-Sleep -Seconds 2
        }
    }
    
    docker-compose exec backend npm run test:api
}

# Función para ejecutar todos los tests
function Start-AllTests {
    Write-Host ""
    Write-Host "🚀 Ejecutando TODOS los tests y debugging..." -ForegroundColor $Blue
    Write-Host ""
    
    Write-Host "📊 PASO 1: Debugging de Base de Datos" -ForegroundColor $Blue
    Write-Host "=======================================" -ForegroundColor $Blue
    Start-DatabaseDebug
    
    Write-Host ""
    Write-Host "📊 PASO 2: Tests de Controllers" -ForegroundColor $Blue
    Write-Host "================================" -ForegroundColor $Blue
    Start-ControllerTests
    
    Write-Host ""
    Write-Host "📊 PASO 3: Tests de Endpoints de API" -ForegroundColor $Blue
    Write-Host "=====================================" -ForegroundColor $Blue
    Start-ApiTests
    
    Write-Host ""
    Write-Host "🎉 ¡TODOS LOS TESTS Y DEBUGGING COMPLETADOS!" -ForegroundColor $Green
}

# Función para gestionar servicios Docker
function Manage-DockerServices {
    Write-Host ""
    Write-Host "🐳 GESTIÓN DE SERVICIOS DOCKER" -ForegroundColor $Yellow
    Write-Host "1. Iniciar servicios"
    Write-Host "2. Detener servicios"
    Write-Host "3. Reiniciar servicios"
    Write-Host "4. Ver estado de servicios"
    Write-Host "5. Ver logs del backend"
    Write-Host "6. Volver al menú principal"
    Write-Host ""
    Write-Host "Selecciona una opción (1-6):" -ForegroundColor $White
    
    $dockerChoice = Read-Host
    
    switch ($dockerChoice) {
        "1" {
            Write-Host "Iniciando servicios..." -ForegroundColor $Blue
            docker-compose up -d
            Write-Host "✅ Servicios iniciados." -ForegroundColor $Green
        }
        "2" {
            Write-Host "Deteniendo servicios..." -ForegroundColor $Yellow
            docker-compose down
            Write-Host "✅ Servicios detenidos." -ForegroundColor $Green
        }
        "3" {
            Write-Host "Reiniciando servicios..." -ForegroundColor $Blue
            docker-compose restart
            Write-Host "✅ Servicios reiniciados." -ForegroundColor $Green
        }
        "4" {
            Write-Host "Estado de servicios:" -ForegroundColor $Blue
            docker-compose ps
        }
        "5" {
            Write-Host "Logs del backend:" -ForegroundColor $Blue
            docker-compose logs backend
        }
        "6" {
            return
        }
        default {
            Write-Host "❌ Opción inválida." -ForegroundColor $Red
        }
    }
}

# Función principal
function Main {
    if (-not (Test-Docker)) {
        exit 1
    }
    
    while ($true) {
        Show-Menu
        $choice = Read-Host
        
        switch ($choice) {
            "1" {
                if (Test-Services) {
                    Start-DatabaseDebug
                }
            }
            "2" {
                if (Test-Services) {
                    Start-ControllerTests
                }
            }
            "3" {
                if (Test-Services) {
                    Start-ApiTests
                }
            }
            "4" {
                if (Test-Services) {
                    Start-AllTests
                }
            }
            "5" {
                Manage-DockerServices
            }
            "6" {
                Write-Host ""
                Write-Host "👋 ¡Hasta luego!" -ForegroundColor $Green
                exit 0
            }
            default {
                Write-Host ""
                Write-Host "❌ Opción inválida. Por favor selecciona 1-6." -ForegroundColor $Red
                Write-Host ""
            }
        }
        
        Write-Host ""
        Write-Host "=====================================================" -ForegroundColor $Blue
        Write-Host ""
    }
}

# Ejecutar función principal
Main 