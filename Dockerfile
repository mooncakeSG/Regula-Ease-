# Multi-stage Dockerfile for RegulaEase
# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production --legacy-peer-deps

# Copy frontend source code
COPY frontend/ .

# Build the React app
RUN npm run build

# Stage 2: Python backend with built frontend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/build ./static

# Create data directory for persistent storage
RUN mkdir -p /app/data

# Copy data files to a backup location so they can be restored after volume mount
RUN if [ -d "data" ]; then cp -r data/* /tmp/; fi

# Copy startup script
COPY backend/startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start the application
CMD ["/app/startup.sh"] 