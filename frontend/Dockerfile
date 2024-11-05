FROM node:18 AS build

WORKDIR /app
COPY frontend/package*.json ./

# パッケージのインストールとビルド
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Serve the build files with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
