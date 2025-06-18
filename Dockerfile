# Stage 1: Use non-Alpine base for Bun with native dependencies
FROM oven/bun:1.0 AS deps
WORKDIR /app

# Install minimal build tools (Debian-based)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json .

# Install dependencies with fallback
RUN bun install --no-save --ignore-scripts || \
    (echo "Warning: Some optional packages failed to install" && \
     bun install --no-save --ignore-scripts --production)

# Stage 2: Build Angular application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from Bun stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Angular app
RUN npm run build -- --configuration=production

# Stage 3: Serve with optimized NGINX
FROM nginx:1.25-alpine

# Copy built Angular files
COPY --from=builder /app/dist/appliq-web-angular/browser /usr/share/nginx/html

# Minimal SPA configuration
RUN echo "try_files \$uri \$uri/ /index.html;" > /etc/nginx/conf.d/spa_fallback.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
