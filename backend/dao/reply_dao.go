package dao

import (
	"backend/db"
	"backend/models"
	"log"
)

func GetRepliesByParentID(parentID int) ([]models.Reply, error) {
	// repliesとusersをJOINしてuser_nameを取得するSQLクエリ
	query := `SELECT replies.id, replies.parent_id, replies.user_id, users.user_name, replies.content, replies.created_at FROM replies INNER JOIN users ON replies.user_id = users.user_id WHERE replies.parent_id = ?`

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
		if err := rows.Scan(&reply.ID, &reply.ParentID, &reply.UserID, &reply.UserName, &reply.Content, &reply.CreatedAt); err != nil {
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

// SaveReply はリプライをデータベースに保存する
func SaveReply(parentID int, userID string, content string, createdAt string) (int64, error) {

	// リプライを挿入
	query := `INSERT INTO replies (parent_id, user_id, content, created_at) VALUES (?, ?, ?, ?)`
	result, err := db.DB.Exec(query, parentID, userID, content, createdAt)
	if err != nil {
		log.Printf("Error inserting reply: %v", err)
		return 0, err
	}

	// 挿入されたIDを取得
	replyID, err := result.LastInsertId()
	if err != nil {
		log.Printf("Error retrieving last insert ID: %v", err)
		return 0, err
	}

	return replyID, nil
}
