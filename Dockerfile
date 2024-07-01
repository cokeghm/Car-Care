# Etapa 1: Construcción del frontend
FROM node:16 as build-stage

WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias del servidor
RUN npm install

# Copia los archivos del cliente y las dependencias
COPY client/package.json client/package-lock.json ./client/

#Instala las dependencias del cliente
RUN npm install --prefix client

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el cliente
RUN npm run build --prefix client

# Etapa 2: Configuración de producción
FROM node:16 as production-stage

WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias del servidor
RUN npm install --only=production

# Copia el servidor y los archivos estáticos construidos
COPY --from=build-stage /app/client/build ./client/build
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["node", "server/server.js"]