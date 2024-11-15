# ビルドステージ
FROM golang:1.23 AS build

# 作業ディレクトリを設定
WORKDIR /app

# Go モジュールを利用するために依存関係をコピー
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# バイナリをビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# 実行ステージ
FROM alpine:latest

# ビルドしたバイナリをコピー
COPY --from=build /app/server /server

# ポートを公開 (必要に応じて設定)
EXPOSE 8080

# アプリケーションを起動
CMD ["/server"]