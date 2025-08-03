# 🧪 Sistema de Testing y Debugging

Este sistema te permite verificar que todos tus controllers y endpoints funcionen correctamente.

## 📋 Archivos de Testing

### 1. **`test/test-controllers.js`**
Tests unitarios para verificar que los controllers de Prisma funcionen correctamente:
- ✅ Prueba todas las operaciones CRUD
- ✅ Verifica las relaciones entre entidades
- ✅ Crea y elimina datos de prueba
- ✅ Valida la integridad de los datos

### 2. **`debug/database-debug.js`**
Script de debugging para verificar el estado de la base de datos:
- 🔍 Verifica la conexión a la base de datos
- 📊 Muestra estadísticas de las tablas
- 🔗 Verifica las relaciones entre entidades
- 🚨 Detecta datos inconsistentes o huérfanos

### 3. **`test/test-api-endpoints.js`**
Tests de endpoints HTTP para verificar la API REST:
- 🌐 Prueba todos los endpoints de la API
- 📡 Verifica respuestas HTTP correctas
- 🔄 Prueba operaciones CRUD completas
- ⚡ Valida el rendimiento de la API

### 4. **`run-tests.js`**
Script principal con menú interactivo para ejecutar todos los tests.

## 🚀 Cómo Usar

### Opción 1: Script Interactivo (Recomendado)
```bash
cd backend
npm run test
```

Esto te mostrará un menú con las siguientes opciones:
1. 🔧 Debugging de Base de Datos
2. 🧪 Tests de Controllers (Prisma)
3. 🌐 Tests de Endpoints de API
4. 🚀 Ejecutar TODOS los tests
5. ❌ Salir

### Opción 2: Scripts Individuales

#### Debugging de Base de Datos
```bash
npm run debug:db
```

#### Tests de Controllers
```bash
npm run test:controllers
```

#### Tests de API (requiere servidor corriendo)
```bash
# Primero inicia el servidor
npm start

# En otra terminal, ejecuta los tests
npm run test:api
```

#### Ejecutar Todos los Tests
```bash
npm run test:all
```

## 📊 Qué Verifican los Tests

### 🔧 Debugging de Base de Datos
- ✅ Conexión a PostgreSQL
- ✅ Existencia de todas las tablas
- ✅ Conteo de registros por tabla
- ✅ Relaciones entre entidades
- ✅ Integridad de datos
- ✅ Estadísticas del sistema

### 🧪 Tests de Controllers
- ✅ **Parcela**: CRUD completo + filtros por cultivo/época
- ✅ **Arbol**: CRUD completo + filtros por parcela
- ✅ **Sensor**: CRUD completo + filtros por árbol/tipo
- ✅ **HorarioRiego**: CRUD completo + filtros por parcela/activo
- ✅ **HistorialRiego**: CRUD completo + filtros por parcela/estado/fecha
- ✅ **Alerta**: CRUD completo + filtros por tipo/severidad/resuelta

### 🌐 Tests de API
- ✅ **GET** endpoints (obtener datos)
- ✅ **POST** endpoints (crear datos)
- ✅ **PUT** endpoints (actualizar datos)
- ✅ **DELETE** endpoints (eliminar datos)
- ✅ **PATCH** endpoints (actualizaciones parciales)
- ✅ Códigos de respuesta HTTP correctos
- ✅ Validación de datos de entrada

## ⚠️ Requisitos Previos

### Para Tests de Controllers y Debugging:
```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate
```

### Para Tests de API:
```bash
# El servidor debe estar corriendo
npm start

# En otra terminal, ejecutar tests
npm run test:api
```

## 📈 Interpretación de Resultados

### ✅ Tests Exitosos
```
🎉 ¡TODOS LOS TESTS PASARON!
✅ La base de datos está funcionando correctamente
```

### ❌ Tests Fallidos
```
⚠️ Algunos tests fallaron. Revisa los errores arriba.
```

Los errores comunes incluyen:
- **Conexión a BD**: Verifica `DATABASE_URL` en `.env`
- **Migraciones**: Ejecuta `npm run prisma:migrate`
- **Servidor**: Asegúrate de que esté corriendo en puerto 3000
- **Dependencias**: Instala `axios` con `npm install axios`

## 🔧 Troubleshooting

### Error de Conexión a Base de Datos
```bash
# Verifica que PostgreSQL esté corriendo
# Verifica la URL en .env
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db"
```

### Error de Migraciones
```bash
# Regenera el cliente de Prisma
npm run prisma:generate

# Ejecuta las migraciones
npm run prisma:migrate
```

### Error de Tests de API
```bash
# Verifica que el servidor esté corriendo
npm start

# Verifica que esté en el puerto correcto
# http://localhost:3000
```

### Error de Dependencias
```bash
# Instala axios si no está instalado
npm install axios
```

## 📝 Notas Importantes

1. **Datos de Prueba**: Los tests crean y eliminan datos de prueba automáticamente
2. **Base de Datos**: Asegúrate de tener una base de datos PostgreSQL configurada
3. **Variables de Entorno**: Verifica que tu archivo `.env` esté configurado correctamente
4. **Servidor**: Para tests de API, el servidor debe estar corriendo en `http://localhost:3000`

## 🎯 Beneficios

- ✅ **Detección Temprana de Errores**: Encuentra problemas antes de producción
- ✅ **Validación Completa**: Verifica todos los aspectos del sistema
- ✅ **Documentación Automática**: Los tests sirven como documentación
- ✅ **Confianza**: Sabes que tu API funciona correctamente
- ✅ **Mantenimiento**: Facilita cambios futuros sin romper funcionalidad

¡Tu sistema de riego agrícola está completamente testeado y listo para producción! 🌱💧 