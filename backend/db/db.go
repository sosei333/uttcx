package db

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file:", err)
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
