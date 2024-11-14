# Step 1: Use a smaller Go image for building
FROM golang:1.18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY backend/ .

# Build the Go application
RUN go build -o main ./cmd/main.go

# Step 2: Use a minimal runtime image
FROM alpine:latest

# Set the working directory in the container
WORKDIR /app

# Copy the built Go binary from the builder stage
COPY --from=builder /app/main .

# Expose the port specified by the Cloud Run environment variable
# Cloud Run sets PORT to 8080 by default
EXPOSE 8080

# Command to run the application
CMD ["./main"]
