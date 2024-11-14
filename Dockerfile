# Step 1: Use a smaller Go image for building
FROM golang:1.21-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy go.mod and go.sum from the backend directory to download dependencies
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy the rest of the source code from backend directory
COPY backend/ .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /main .

# Step 2: Use a minimal runtime image with Alpine
FROM alpine:latest

# Set the working directory in the container
WORKDIR /app

# Copy the built Go binary from the builder stage
COPY --from=build /main .

# Install necessary certificates (e.g., for HTTPS connections)
RUN apk --no-cache add ca-certificates

# Expose the default port for Cloud Run
EXPOSE 8080

# Command to run the application
CMD ["./main"]
