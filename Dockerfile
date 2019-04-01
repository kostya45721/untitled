### STAGE 1: Build ###
FROM node:8.11.1-alpine as builder
# Preparing working environment.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Installing dependencies.
COPY package*.json /usr/src/app/
RUN npm install
# Copy openhome-panel source into image.
COPY . /usr/src/app
# Building app.
RUN npm run-script build --prod

### STAGE 2: Setup ###
FROM nginx:1.13.12-alpine
# Removing nginx default page.
RUN rm -rf /usr/share/nginx/html/*
# Copying nginx configuration.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copying openhome-panel source into web server root.
COPY --from=builder /usr/src/app/dist/untitled /etc/nginx/html
# Exposing ports.
EXPOSE 80
# Starting server.
CMD ["nginx", "-g", "daemon off;"]
