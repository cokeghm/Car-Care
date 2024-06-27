# Usar una imagen base oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo en la imagen Docker
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación React
RUN npm install --prefix client && npm run build --prefix client

# Exponer el puerto de la aplicación
EXPOSE 3000

# Definir el comando para iniciar la aplicación
CMD ["node", "server.js"]