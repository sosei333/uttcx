# Step 1: Build the Go application
FROM golang:1.19 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy only the Go module files and download dependencies (cache optimization)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main go.main

# Step 2: Create a minimal runtime image
FROM alpine:latest

# Set the working directory in the container
WORKDIR /root/

# Copy the built Go binary from the builder stage
COPY --from=builder /app/main .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["./main"]
