# 🌱 Proyecto: Sistema Inteligente de Riego para Agricultores

## 🧠 Resumen Ejecutivo
Este proyecto desarrolla un sistema integral de **riego inteligente para agricultores**, accesible a través de plataformas **web y móviles**. Su objetivo es **optimizar el uso del agua**, **mejorar la productividad** y **reducir el desperdicio de recursos**.  
El sistema proporciona **recomendaciones de riego precisas**, basándose en la combinación de **datos de sensores en tiempo real** y **cálculos agrometeorológicos avanzados**.

---

## 🧩 Arquitectura y Componentes Clave

La solución se construye sobre una arquitectura **modular y escalable**, con los siguientes componentes principales:

### 📡 Sensores IoT
- **Función**: Recolección de datos ambientales esenciales.
- **Detalles**: Sensores de humedad y temperatura del suelo (controlados por Arduino) que envían mediciones continuas a la nube.
- **Tecnología**: Conectividad **Wi-Fi**.

### ☁️ Base de Datos en Tiempo Real
- **Función**: Almacenamiento centralizado y sincronización de datos.
- **Detalles**: Repositorio principal para los datos de los sensores, asegurando acceso inmediato a la información más reciente.
- **Tecnología**: **Google Firebase Realtime Database**.

### 💻 Backend (API RESTful)
- **Función**: Lógica de negocio y procesamiento inteligente.
- **Detalles**:
  - Procesa datos de los sensores.
  - Enriquecimiento con información climática externa.
  - Aplica la fórmula de **evapotranspiración de la FAO**.
  - Maneja autenticación y permisos de usuario.
- **Tecnología**: **Node.js** con **Express.js**.
- **Integración**: **OpenWeather API**.

### 🌐 Frontend Web (Aplicación y Portal de la Empresa)
- **Función**: Interfaz de usuario integral.
- **Detalles**:
  - **Página Corporativa**: Información de la empresa y beneficios del sistema.
  - **Panel de Administración (CMS)**: Modificación de contenido sin necesidad de programar.
  - **Autenticación**: Registro y login para agricultores.
  - **Aplicación de Riego**: Panel interactivo con datos, recomendaciones y gestión de cultivos.
- **Tecnología**: **Next.js**.

### ⚙️ n8n (Automatización de Flujos de Trabajo)
- **Función**: Automatización de procesos y notificaciones.
- **Detalles**:
  - Gestión de tareas repetitivas.
  - Comunicación con usuarios mediante alertas, correos y recordatorios de riego.
- **Tecnología**: **n8n**.

### 📱 App Móvil (Futura Expansión)
- **Función**: Acceso desde el campo.
- **Detalles**: Aplicación nativa en desarrollo para que los agricultores accedan a funcionalidades clave desde sus dispositivos móviles.
- **Tecnología Prevista**: **React Native** o **Flutter**.

---

## 🛠️ Infraestructura del Proyecto con Docker

Todo el entorno de desarrollo y despliegue se gestiona con **Docker**, asegurando consistencia y simplificación del despliegue.

- **Orquestación**: `Docker Compose`
- **Servicios Contenerizados**:
  - `frontend`: Aplicación **Next.js**
  - `backend`: API **Node.js**
  - `n8n`: Instancia de **n8n**
- **Servicios Externos (No Contenerizados)**:
  - **Firebase**: Consumido desde la nube.
  - **OpenWeather API**: Acceso mediante internet.

---

## 🚀 Flujo de Datos

```mermaid
flowchart TD
    A[Sensores IoT] -->|Mediciones| B[Firebase Realtime Database]
    B --> C[Backend - Node.js]
    C -->|Datos climáticos| D[OpenWeather API]
    C -->|Cálculo de riego| E[Recomendaciones]
    E --> F[Frontend - Next.js]
    C --> G[n8n - Automatización]
    G -->|Alertas / Notificaciones| H[Usuario Final]
    F -->|Visualización| H
