# ステージ1: Goアプリケーションのビルド
FROM golang:1.20-alpine AS builder

WORKDIR /app

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN go build -o main .

# ステージ2: アプリケーションの実行
FROM alpine:latest

WORKDIR /app

# ビルドしたバイナリをコピー
COPY --from=builder /app/main .

# アプリケーションが使用するポートを公開
EXPOSE 8000

# バイナリを実行するコマンド
CMD ["./main"]
