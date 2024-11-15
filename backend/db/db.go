package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	// .envからのみ読み込む環境変数
	envVars := []string{"DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST", "DB_PORT", "PORT"}

	//if os.Getenv("ENV") != "production" {	//golandでの実行時はコメントアウト解除
	//	// 本番環境でない場合のみ .env を読み込む
	//	if err := godotenv.Load(".env"); err != nil {
	//		log.Println("Warning: .env file not found, using environment variables.")
	//	}
	//}

	// .envから読み込んだ環境変数を出力
	fmt.Println("Loaded environment variables from .env:")
	for _, key := range envVars {
		value := os.Getenv(key)
		fmt.Printf("%s=%s\n", key, value)
	}

	mysqlUser := os.Getenv("DB_USER")
	mysqlUserPwd := os.Getenv("DB_PASSWORD")
	mysqlDatabase := os.Getenv("DB_NAME")
	mysqlHost := os.Getenv("DB_HOST")
	mysqlPort := os.Getenv("DB_PORT")

	if mysqlUser == "" || mysqlUserPwd == "" || mysqlDatabase == "" {
		log.Fatal("必要な環境変数が設定されていません")
	}

	_db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", mysqlUser, mysqlUserPwd, mysqlHost, mysqlPort, mysqlDatabase))

	if err != nil {
		log.Fatalf("fail: sql.Open, %v\n", err)
	}
	if err := _db.Ping(); err != nil {
		log.Fatalf("fail: _db.Ping, %v\n", err)
	}
	DB = _db
}

func CloseDB() error {
	return DB.Close()
}
