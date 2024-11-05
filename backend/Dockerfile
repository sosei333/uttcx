# Stage 1: Build the Go application
FROM golang:1.20 AS builder

WORKDIR /app

# Go モジュールと依存関係をコピー
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# ソースコードをコピーしてビルド
COPY backend/ .
RUN go build -o server .

# Stage 2: Run the Go application
FROM gcr.io/distroless/base-debian10

WORKDIR /app
COPY --from=builder /app/server .

# 必要に応じて環境変数を設定
ENV PORT=8080

EXPOSE 8080
CMD ["./server"]
