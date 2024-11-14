# ビルドステージ
FROM golang:1.21 as build

# 作業ディレクトリを設定
WORKDIR /app

# Go モジュールを利用するために依存関係をコピー
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download

# ソースコードをコピー
COPY ./backend .

# バイナリをビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# 実行ステージ
FROM alpine:latest

# 証明書をインストール
RUN apk --no-cache add ca-certificates

# ビルドしたバイナリをコピー
COPY --from=build /app/server /server

# ポートを公開 (必要に応じて設定)
EXPOSE 8080

# アプリケーションを起動
CMD ["/server"]