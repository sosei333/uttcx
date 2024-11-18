package dao

import (
	"backend/db"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"time"
)

// 投稿データを保存
func SavePost(userID, content, createdAt string) error {
	query := `INSERT INTO posts (user_id, content, created_at) VALUES (?, ?, ?)`

	// デフォルトで現在時刻を使用する場合
	if createdAt == "" {
		createdAt = time.Now().Format("2006-01-02 15:04:05")
	}

	_, err := db.DB.Exec(query, userID, content, createdAt)
	if err != nil {
		log.Printf("Error executing SavePost: %v", err)
		return err
	}

	log.Printf("Post saved: user_id=%s, content=%s", userID, content)
	return nil
}
