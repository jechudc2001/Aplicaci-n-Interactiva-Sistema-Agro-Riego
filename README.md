# 🌱 Sistema Inteligente de Riego para Agricultores

## 📋 Descripción

Sistema de riego inteligente que permite gestionar parcelas agrícolas, árboles, sensores, horarios de riego, historial de riego y alertas. Desarrollado con Node.js, Express, Prisma ORM y PostgreSQL.

## 🏗️ Arquitectura

- **Backend**: Node.js + Express + Prisma ORM
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker + Docker Compose
- **Testing**: Scripts automatizados para controllers y API endpoints

## 🚀 Inicio Rápido con Docker

### Prerrequisitos

- Docker Desktop instalado
- Docker Compose instalado

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd Aplicaci-n-Interactiva-Sistema-Agro-Riego
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en el directorio `backend/`:

```env
DATABASE_URL="postgresql://postgres:password@postgres:5432/agrodb"
```

### 3. Iniciar Servicios con Docker

```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Verificar que los contenedores estén funcionando
docker-compose ps
```

### 4. Crear las Tablas de la Base de Datos

```bash
# Ejecutar migraciones para crear las tablas
docker-compose exec backend npx prisma migrate dev --name init
```

### 5. Verificar que Todo Funcione

```bash
# Ejecutar todos los tests
docker-compose exec backend npm run test:all
```

## 📊 Estructura de la Base de Datos

### Tablas Principales

- **Parcela**: Gestión de parcelas agrícolas
- **Arbol**: Árboles dentro de las parcelas
- **Sensor**: Sensores de monitoreo en los árboles
- **HorarioRiego**: Programación de riego automático
- **HistorialRiego**: Registro de eventos de riego
- **Alerta**: Sistema de alertas y notificaciones

### Relaciones

```
Parcela (1) ←→ (N) Arbol
Arbol (1) ←→ (N) Sensor
Parcela (1) ←→ (N) HorarioRiego
Parcela (1) ←→ (N) HistorialRiego
Parcela (1) ←→ (N) Alerta
Arbol (1) ←→ (N) Alerta
Sensor (1) ←→ (N) Alerta
```

## 🔧 Comandos Útiles

### Gestión de Docker

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs del backend
docker-compose logs backend

# Ver logs de la base de datos
docker-compose logs postgres

# Reconstruir imagen del backend
docker-compose build --no-cache backend
```

### Gestión de la Base de Datos

```bash
# Ejecutar migraciones
docker-compose exec backend npx prisma migrate dev

# Ver estado de la base de datos
docker-compose exec backend npx prisma studio

# Resetear base de datos
docker-compose exec backend npx prisma migrate reset
```

### Testing y Debugging

```bash
# Ejecutar todos los tests
docker-compose exec backend npm run test:all

# Debugging de la base de datos
docker-compose exec backend npm run debug:db

# Tests de controllers
docker-compose exec backend npm run test:controllers

# Tests de API endpoints
docker-compose exec backend npm run test:api
```

## 🌐 API Endpoints

### Parcelas
- `GET /parcelas` - Obtener todas las parcelas
- `POST /parcelas` - Crear nueva parcela
- `GET /parcelas/:id` - Obtener parcela por ID
- `PUT /parcelas/:id` - Actualizar parcela
- `DELETE /parcelas/:id` - Eliminar parcela
- `GET /parcelas/cultivo/:cultivoId` - Parcelas por cultivo
- `GET /parcelas/epoca/:epocaId` - Parcelas por época

### Árboles
- `GET /arboles` - Obtener todos los árboles
- `POST /arboles` - Crear nuevo árbol
- `GET /arboles/:id` - Obtener árbol por ID
- `PUT /arboles/:id` - Actualizar árbol
- `DELETE /arboles/:id` - Eliminar árbol
- `GET /arboles/parcela/:parcelaId` - Árboles por parcela

### Sensores
- `GET /sensores` - Obtener todos los sensores
- `POST /sensores` - Crear nuevo sensor
- `GET /sensores/:id` - Obtener sensor por ID
- `PUT /sensores/:id` - Actualizar sensor
- `DELETE /sensores/:id` - Eliminar sensor
- `GET /sensores/arbol/:arbolId` - Sensores por árbol
- `GET /sensores/tipo/:tipo` - Sensores por tipo

### Horarios de Riego
- `GET /horarios` - Obtener todos los horarios
- `POST /horarios` - Crear nuevo horario
- `GET /horarios/:id` - Obtener horario por ID
- `PUT /horarios/:id` - Actualizar horario
- `DELETE /horarios/:id` - Eliminar horario
- `GET /horarios/parcela/:parcelaId` - Horarios por parcela
- `GET /horarios/activos` - Horarios activos
- `PATCH /horarios/:id/toggle` - Activar/desactivar horario

### Historial de Riego
- `GET /historial` - Obtener todo el historial
- `POST /historial` - Crear nuevo registro
- `GET /historial/:id` - Obtener registro por ID
- `PUT /historial/:id` - Actualizar registro
- `DELETE /historial/:id` - Eliminar registro
- `GET /historial/parcela/:parcelaId` - Historial por parcela
- `GET /historial/estado/:estado` - Historial por estado

### Alertas
- `GET /alertas` - Obtener todas las alertas
- `POST /alertas` - Crear nueva alerta
- `GET /alertas/:id` - Obtener alerta por ID
- `PUT /alertas/:id` - Actualizar alerta
- `DELETE /alertas/:id` - Eliminar alerta
- `GET /alertas/tipo/:tipo` - Alertas por tipo
- `GET /alertas/severidad/:severidad` - Alertas por severidad
- `GET /alertas/no-resueltas` - Alertas no resueltas
- `PATCH /alertas/:id/resolver` - Marcar alerta como resuelta

## 🧪 Testing

### Scripts Disponibles

```bash
# Ejecutar todos los tests
npm run test:all

# Debugging de la base de datos
npm run debug:db

# Tests de controllers
npm run test:controllers

# Tests de API endpoints
npm run test:api
```

### Cobertura de Tests

- ✅ **43 endpoints** de API probados
- ✅ **37 funciones** de controllers probadas
- ✅ **100% de éxito** en todos los tests
- ✅ **Debugging completo** de la base de datos

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Error de Conexión a la Base de Datos
```bash
# Verificar que PostgreSQL esté corriendo
docker-compose ps

# Ver logs de PostgreSQL
docker-compose logs postgres
```

#### 2. Error de Prisma Client
```bash
# Regenerar Prisma Client
docker-compose exec backend npx prisma generate

# Reconstruir imagen
docker-compose build --no-cache backend
```

#### 3. Error de Migraciones
```bash
# Resetear migraciones
docker-compose exec backend npx prisma migrate reset

# Crear nueva migración
docker-compose exec backend npx prisma migrate dev --name init
```

#### 4. Contenedor se Reinicia Constantemente
```bash
# Ver logs del backend
docker-compose logs backend

# Verificar variables de entorno
docker-compose exec backend env | grep DATABASE
```

## 📁 Estructura del Proyecto

```
Aplicaci-n-Interactiva-Sistema-Agro-Riego/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── routes/          # Definición de rutas
│   │   ├── prisma/          # Cliente Prisma
│   │   └── index.js         # Punto de entrada
│   ├── prisma/
│   │   ├── schema.prisma    # Esquema de la base de datos
│   │   └── migrations/      # Migraciones
│   ├── test/                # Tests de controllers
│   ├── debug/               # Scripts de debugging
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🎯 Estado del Proyecto

### ✅ Completado
- [x] Backend API con Express
- [x] Base de datos PostgreSQL con Prisma
- [x] Contenedores Docker configurados
- [x] Migraciones de base de datos
- [x] Controllers completos (CRUD)
- [x] Rutas de API implementadas
- [x] Sistema de testing automatizado
- [x] Scripts de debugging
- [x] Documentación completa

### 🚀 Listo para Desarrollo
- [x] Entorno Docker completamente funcional
- [x] Tests pasando al 100%
- [x] API endpoints operativos
- [x] Base de datos configurada

## 📞 Soporte

Si encuentras algún problema:

1. Verifica que Docker esté corriendo
2. Ejecuta `docker-compose logs` para ver errores
3. Revisa que las variables de entorno estén configuradas
4. Ejecuta los tests para verificar el estado del sistema

---

**¡El sistema está listo para usar! 🎉**
