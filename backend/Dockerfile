FROM node:20-alpine

# Instalar OpenSSL necesario para Prisma
RUN apk add --no-cache openssl

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo package.json y lock para instalar dependencias primero (mejor cacheo)
COPY package*.json ./

# Instalar dependencias (antes de copiar todo para evitar reinstalar innecesariamente)
RUN npm install

# Copiar código fuente y archivos restantes
COPY . .

# Copiar archivos Prisma por separado (redundante pero seguro)
COPY prisma ./prisma

# Generar el cliente Prisma para producción
RUN npx prisma generate

# Exponer puerto de la API
EXPOSE 3000

# Comando por defecto (puedes cambiar "start" a "dev" si usas nodemon)
CMD ["npm", "start"]
