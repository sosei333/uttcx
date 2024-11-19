package dao

import (
	"backend/db"
	"backend/models"
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

func GetAllPost() ([]models.Post, error) {
	query := `SELECT id, user_id, content, created_at FROM posts`

	// クエリを実行
	rows, err := db.DB.Query(query)
	if err != nil {
		log.Printf("Error executing query in GetAllPost: %v", err)
		return nil, err
	}
	defer rows.Close()

	// 結果を格納するスライス
	var posts []models.Post

	// データベースの行をループしながら読み取る
	for rows.Next() {
		var post models.Post
		if err := rows.Scan(&post.ID, &post.UserID, &post.Content, &post.CreatedAt); err != nil {
			log.Printf("Error scanning row in GetAllPost: %v", err)
			return nil, err
		}
		posts = append(posts, post)
	}

	// rows.Next() 後のエラーチェック
	if err := rows.Err(); err != nil {
		log.Printf("Rows iteration error in GetAllPost: %v", err)
		return nil, err
	}

	return posts, nil
}
