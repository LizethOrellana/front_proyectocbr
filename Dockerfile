
FROM node:latest AS build-env
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install build dependencies including Python
RUN apt-get update && apt-get install -y python3 python3-pip build-essential

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npx ng build --configuration production --browser-target=front_proyectocbr:build

# Stage 2: Serve the built application with a lightweight web server (e.g., nginx)
FROM nginx:alpine
COPY --from=build-env /app/dist/front_proyectocbr/browser/ /usr/share/nginx/html

# Optionally, you can copy a custom nginx configuration file
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]