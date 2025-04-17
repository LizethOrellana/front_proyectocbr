# Etapa 1: build de Angular
FROM node:20-slim AS build-stage

WORKDIR /app

# Instala dependencias necesarias para compilar
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --legacy-peer-deps  # Usamos npm ci para instalar dependencias desde el lockfile

COPY . .
RUN npm run build --configuration=production

# Etapa 2: nginx para servir Angular
FROM nginx:alpine

COPY --from=build-stage /app/dist/front_proyectocbr/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
