package dao

import (
	"backend/db"
	"backend/models"
	"database/sql"
	"log"
)

type Reply struct {
	ID        int    `json:"id"`
	ParentID  int    `json:"parent_id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}

func SaveReply(db *sql.DB, reply Reply) (int, error) {
	query := `INSERT INTO replies (parent_id, user_id, content, created_at) VALUES (?, ?, ?, ?)`
	result, err := db.Exec(query, reply.ParentID, reply.UserID, reply.Content, reply.CreatedAt)
	if err != nil {
		return 0, err
	}

	insertedID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(insertedID), nil
}

func GetRepliesByParentID(parentID int) ([]models.Reply, error) {
	query := `SELECT id, parent_id, user_id, content, created_at FROM replies WHERE parent_id = ?`

	// クエリを実行
	rows, err := db.DB.Query(query, parentID)
	if err != nil {
		log.Printf("Error executing query for parent_id %d: %v", parentID, err)
		return nil, err
	}
	defer rows.Close()

	// 結果をスライスに格納
	var replies []models.Reply
	for rows.Next() {
		var reply models.Reply
		if err := rows.Scan(&reply.ID, &reply.ParentID, &reply.UserID, &reply.Content, &reply.CreatedAt); err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil, err
		}
		replies = append(replies, reply)
	}

	// rows.Err() の確認
	if err := rows.Err(); err != nil {
		log.Printf("Rows iteration error: %v", err)
		return nil, err
	}

	return replies, nil
}
