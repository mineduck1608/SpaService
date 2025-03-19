# Sử dụng Node.js để build ứng dụng React
FROM node:18 AS build
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ code và build ứng dụng
COPY . .
RUN npm run build

# Dùng Nginx để serve ứng dụng React
FROM nginx:alpine

# Copy file cấu hình Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build của React vào Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
