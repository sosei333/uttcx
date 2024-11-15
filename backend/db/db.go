package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

// InitDB initializes the database connection using environment variables.
func InitDB() {
	// 環境変数の取得
	mysqlUser := os.Getenv("DB_USER")
	mysqlUserPwd := os.Getenv("DB_PASSWORD")
	mysqlDatabase := os.Getenv("DB_NAME")
	mysqlHost := os.Getenv("DB_HOST") // UnixソケットまたはTCPホスト
	mysqlPort := os.Getenv("DB_PORT")
	if mysqlPort == "" {
		mysqlPort = "3306" // デフォルトポート
	}

	// 環境変数の必須チェック
	requiredVars := []string{"DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST"}
	for _, key := range requiredVars {
		if os.Getenv(key) == "" {
			log.Fatalf("環境変数が設定されていません: %s", key)
		}
	}

	// 接続文字列の組み立て
	var connStr string
	if len(mysqlHost) > 5 && mysqlHost[:5] == "unix(" {
		// Unixソケットを使用
		connStr = fmt.Sprintf("%s:%s@%s/%s", mysqlUser, mysqlUserPwd, mysqlHost, mysqlDatabase)
	} else {
		// TCP接続を使用
		connStr = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", mysqlUser, mysqlUserPwd, mysqlHost, mysqlPort, mysqlDatabase)
	}

	log.Printf("Connecting to database with connection string: %s", connStr)

	// データベース接続の初期化
	_db, err := sql.Open("mysql", connStr)
	if err != nil {
		log.Fatalf("fail: sql.Open, error: %v", err)
	}
	if err := _db.Ping(); err != nil {
		log.Fatalf("fail: _db.Ping, error: %v", err)
	}
	DB = _db
	log.Println("Database connection established successfully")
}

// CloseDB closes the database connection.
func CloseDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
