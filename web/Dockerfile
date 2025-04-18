# ===== BUILD STAGE =====
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /var/www/web

# Copy dependency definitions
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the Next.js app for production
RUN yarn build

# ===== RUN STAGE =====
FROM node:18-alpine AS runner

WORKDIR /var/www/web

# Copy only necessary files from the builder stage
COPY --from=builder /var/www/web/public ./public
COPY --from=builder /var/www/web/.next ./.next
COPY --from=builder /var/www/web/package.json ./package.json
COPY --from=builder /var/www/web/yarn.lock ./yarn.lock
COPY --from=builder /var/www/web/node_modules ./node_modules

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Start the app using the direct path to the Next.js binary
CMD ["node_modules/.bin/next", "start"]
