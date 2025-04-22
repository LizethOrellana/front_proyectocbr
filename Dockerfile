# Etapa 1: build de Angular
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=./dist/frontend-udipsai/browser
# Etapa 2: nginx para servir Angular
FROM nginx:alpine

COPY --from=build-stage /app/dist/front_proyectocbr/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
