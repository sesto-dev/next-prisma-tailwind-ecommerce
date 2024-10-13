# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN bun prisma generate

# Build the Next.js application
RUN bun run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

# Set environment variables
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Copy built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["bun", "run", "start"]
