#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 SISTEMA DE TESTING Y DEBUGGING CON DOCKER${NC}"
echo -e "${BLUE}============================================${NC}\n"

# Función para mostrar el menú
show_menu() {
    echo -e "${YELLOW}📋 OPCIONES DISPONIBLES:${NC}"
    echo "1. 🔧 Debugging de Base de Datos"
    echo "2. 🧪 Tests de Controllers (Prisma)"
    echo "3. 🌐 Tests de Endpoints de API"
    echo "4. 🚀 Ejecutar TODOS los tests"
    echo "5. 🐳 Iniciar/Detener servicios Docker"
    echo "6. ❌ Salir"
    echo -e "\nSelecciona una opción (1-6):"
}

# Función para verificar si Docker está corriendo
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker no está corriendo. Por favor inicia Docker Desktop.${NC}"
        exit 1
    fi
}

# Función para verificar si los servicios están corriendo
check_services() {
    if ! docker-compose ps | grep -q "Up"; then
        echo -e "${YELLOW}⚠️  Los servicios Docker no están corriendo.${NC}"
        echo -e "${BLUE}Iniciando servicios...${NC}"
        docker-compose up -d
        echo -e "${GREEN}✅ Servicios iniciados. Esperando 10 segundos para que estén listos...${NC}"
        sleep 10
    else
        echo -e "${GREEN}✅ Servicios Docker ya están corriendo.${NC}"
    fi
}

# Función para debugging de base de datos
run_database_debug() {
    echo -e "\n${BLUE}🔧 Iniciando debugging de base de datos...${NC}\n"
    docker-compose exec backend npm run debug:db
}

# Función para tests de controllers
run_controller_tests() {
    echo -e "\n${BLUE}🧪 Iniciando tests de controllers...${NC}\n"
    docker-compose exec backend npm run test:controllers
}

# Función para tests de API
run_api_tests() {
    echo -e "\n${BLUE}🌐 Iniciando tests de endpoints de API...${NC}\n"
    echo -e "${YELLOW}⚠️  Verificando que el servidor esté listo...${NC}"
    
    # Esperar a que el servidor esté listo
    for i in {1..30}; do
        if curl -s http://localhost:3000/api/parcelas > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Servidor listo!${NC}"
            break
        fi
        echo -e "${YELLOW}⏳ Esperando servidor... (${i}/30)${NC}"
        sleep 2
    done
    
    docker-compose exec backend npm run test:api
}

# Función para ejecutar todos los tests
run_all_tests() {
    echo -e "\n${BLUE}🚀 Ejecutando TODOS los tests y debugging...${NC}\n"
    
    echo -e "${BLUE}📊 PASO 1: Debugging de Base de Datos${NC}"
    echo -e "${BLUE}=======================================${NC}"
    run_database_debug
    
    echo -e "\n${BLUE}📊 PASO 2: Tests de Controllers${NC}"
    echo -e "${BLUE}================================${NC}"
    run_controller_tests
    
    echo -e "\n${BLUE}📊 PASO 3: Tests de Endpoints de API${NC}"
    echo -e "${BLUE}=====================================${NC}"
    run_api_tests
    
    echo -e "\n${GREEN}🎉 ¡TODOS LOS TESTS Y DEBUGGING COMPLETADOS!${NC}"
}

# Función para gestionar servicios Docker
manage_docker_services() {
    echo -e "\n${YELLOW}🐳 GESTIÓN DE SERVICIOS DOCKER${NC}"
    echo "1. Iniciar servicios"
    echo "2. Detener servicios"
    echo "3. Reiniciar servicios"
    echo "4. Ver estado de servicios"
    echo "5. Ver logs del backend"
    echo "6. Volver al menú principal"
    echo -e "\nSelecciona una opción (1-6):"
    
    read -r docker_choice
    case $docker_choice in
        1)
            echo -e "${BLUE}Iniciando servicios...${NC}"
            docker-compose up -d
            echo -e "${GREEN}✅ Servicios iniciados.${NC}"
            ;;
        2)
            echo -e "${YELLOW}Deteniendo servicios...${NC}"
            docker-compose down
            echo -e "${GREEN}✅ Servicios detenidos.${NC}"
            ;;
        3)
            echo -e "${BLUE}Reiniciando servicios...${NC}"
            docker-compose restart
            echo -e "${GREEN}✅ Servicios reiniciados.${NC}"
            ;;
        4)
            echo -e "${BLUE}Estado de servicios:${NC}"
            docker-compose ps
            ;;
        5)
            echo -e "${BLUE}Logs del backend:${NC}"
            docker-compose logs backend
            ;;
        6)
            return
            ;;
        *)
            echo -e "${RED}❌ Opción inválida.${NC}"
            ;;
    esac
}

# Función principal
main() {
    check_docker
    
    while true; do
        show_menu
        read -r choice
        
        case $choice in
            1)
                check_services
                run_database_debug
                ;;
            2)
                check_services
                run_controller_tests
                ;;
            3)
                check_services
                run_api_tests
                ;;
            4)
                check_services
                run_all_tests
                ;;
            5)
                manage_docker_services
                ;;
            6)
                echo -e "\n${GREEN}👋 ¡Hasta luego!${NC}"
                exit 0
                ;;
            *)
                echo -e "\n${RED}❌ Opción inválida. Por favor selecciona 1-6.${NC}\n"
                ;;
        esac
        
        echo -e "\n${BLUE}"====================================================="${NC}\n"
    done
}

# Ejecutar función principal
main 