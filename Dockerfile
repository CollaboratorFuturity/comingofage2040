# ---- Stage 1: build the Vite/React app ----
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

# ---- Stage 2: serve with nginx ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
