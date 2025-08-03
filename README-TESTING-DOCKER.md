# 🐳 Sistema de Testing y Debugging con Docker

Este sistema te permite ejecutar todos los tests y debugging dentro de contenedores Docker, asegurando un entorno consistente y reproducible.

## 🚀 Cómo Usar con Docker

### Opción 1: Script Automático (Recomendado)

#### En Linux/Mac:
```bash
# Dar permisos de ejecución
chmod +x docker-test.sh

# Ejecutar el script
./docker-test.sh
```

#### En Windows (PowerShell):
```powershell
# Ejecutar el script PowerShell
.\docker-test.ps1
```

### Opción 2: Comandos Manuales

#### 1. Iniciar servicios Docker:
```bash
docker-compose up -d
```

#### 2. Ejecutar tests individuales:

**Debugging de Base de Datos:**
```bash
docker-compose exec backend npm run debug:db
```

**Tests de Controllers:**
```bash
docker-compose exec backend npm run test:controllers
```

**Tests de API:**
```bash
docker-compose exec backend npm run test:api
```

**Todos los tests:**
```bash
docker-compose exec backend npm run test:all
```

## 📋 Menú del Sistema

El script te mostrará un menú interactivo con las siguientes opciones:

1. **🔧 Debugging de Base de Datos**
   - Verifica conexión a PostgreSQL
   - Muestra estadísticas de tablas
   - Verifica relaciones entre entidades
   - Detecta datos inconsistentes

2. **🧪 Tests de Controllers (Prisma)**
   - Prueba todas las operaciones CRUD
   - Verifica relaciones entre entidades
   - Crea y elimina datos de prueba
   - Valida integridad de datos

3. **🌐 Tests de Endpoints de API**
   - Prueba todos los endpoints HTTP
   - Verifica respuestas HTTP correctas
   - Prueba operaciones CRUD completas
   - Valida rendimiento de la API

4. **🚀 Ejecutar TODOS los tests**
   - Ejecuta secuencialmente todos los tests
   - Proporciona un reporte completo
   - Identifica problemas específicos

5. **🐳 Iniciar/Detener servicios Docker**
   - Gestiona contenedores Docker
   - Ver estado de servicios
   - Ver logs del backend
   - Reiniciar servicios

6. **❌ Salir**

## 🔧 Gestión de Servicios Docker

### Comandos Útiles:

**Ver estado de servicios:**
```bash
docker-compose ps
```

**Ver logs del backend:**
```bash
docker-compose logs backend
```

**Reiniciar servicios:**
```bash
docker-compose restart
```

**Detener servicios:**
```bash
docker-compose down
```

**Reconstruir imagen:**
```bash
docker-compose build --no-cache
```

## ⚠️ Requisitos Previos

### 1. Docker Desktop
- Instalar Docker Desktop
- Asegurarse de que esté corriendo

### 2. Docker Compose
- Verificar que esté instalado: `docker-compose --version`

### 3. Configuración del Proyecto
```bash
# Clonar o navegar al proyecto
cd Aplicaci-n-Interactiva-Sistema-Agro-Riego

# Verificar que docker-compose.yml existe
ls docker-compose.yml
```

## 📊 Estructura de Archivos

```
Aplicaci-n-Interactiva-Sistema-Agro-Riego/
├── docker-compose.yml          # Configuración de servicios
├── docker-test.sh             # Script para Linux/Mac
├── docker-test.ps1            # Script para Windows
├── backend/
│   ├── Dockerfile             # Imagen del backend
│   ├── package.json           # Dependencias
│   ├── test/                  # Tests de controllers
│   ├── debug/                 # Scripts de debugging
│   └── src/                   # Código fuente
└── README-TESTING-DOCKER.md   # Esta documentación
```

## 🔍 Troubleshooting

### Error: "Docker no está corriendo"
```bash
# Iniciar Docker Desktop
# En Windows: Buscar "Docker Desktop" y ejecutar
# En Mac: Buscar "Docker Desktop" y ejecutar
# En Linux: sudo systemctl start docker
```

### Error: "Servicios no están corriendo"
```bash
# Iniciar servicios manualmente
docker-compose up -d

# Verificar estado
docker-compose ps
```

### Error: "Puerto 3000 ocupado"
```bash
# Verificar qué está usando el puerto
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Linux/Mac

# Detener proceso o cambiar puerto en docker-compose.yml
```

### Error: "Base de datos no accesible"
```bash
# Verificar logs de PostgreSQL
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart
```

### Error: "Migraciones no ejecutadas"
```bash
# Ejecutar migraciones dentro del contenedor
docker-compose exec backend npm run prisma:migrate

# Generar cliente de Prisma
docker-compose exec backend npm run prisma:generate
```

## 📈 Ventajas de Usar Docker

### ✅ **Consistencia**
- Mismo entorno en desarrollo y producción
- No hay conflictos de dependencias
- Configuración reproducible

### ✅ **Aislamiento**
- Cada servicio en su propio contenedor
- No interfiere con el sistema local
- Fácil limpieza y reinstalación

### ✅ **Portabilidad**
- Funciona en cualquier sistema con Docker
- Fácil despliegue en diferentes entornos
- Configuración versionada

### ✅ **Escalabilidad**
- Fácil agregar nuevos servicios
- Configuración de redes y volúmenes
- Gestión de recursos

## 🎯 Flujo de Trabajo Recomendado

1. **Iniciar Docker Desktop**
2. **Ejecutar script de testing:**
   ```bash
   ./docker-test.sh  # Linux/Mac
   # o
   .\docker-test.ps1  # Windows
   ```
3. **Seleccionar opción 5 para gestionar servicios**
4. **Seleccionar opción 1 para iniciar servicios**
5. **Ejecutar tests según necesidad:**
   - Opción 1: Debugging de BD
   - Opción 2: Tests de Controllers
   - Opción 3: Tests de API
   - Opción 4: Todos los tests

## 📝 Notas Importantes

1. **Primera ejecución**: Puede tardar más tiempo en descargar imágenes
2. **Base de datos**: Se crea automáticamente en el primer inicio
3. **Volúmenes**: Los datos persisten entre reinicios
4. **Logs**: Usar `docker-compose logs` para debugging
5. **Redes**: Los servicios se comunican internamente

## 🚀 Comandos Rápidos

```bash
# Iniciar todo
docker-compose up -d

# Ejecutar todos los tests
docker-compose exec backend npm run test:all

# Ver logs en tiempo real
docker-compose logs -f backend

# Detener todo
docker-compose down

# Limpiar completamente
docker-compose down -v --remove-orphans
```

¡Tu sistema de riego agrícola está completamente containerizado y listo para testing! 🌱💧🐳 