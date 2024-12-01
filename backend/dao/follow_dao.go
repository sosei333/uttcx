package dao

import (
	"backend/db"
	"backend/models"
	"log"
)

func AddFollow(FollowerID string, FollowedID string) error {
	// フォローを追加
	query := "INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)"
	_, err := db.DB.Exec(query, FollowerID, FollowedID)
	if err != nil {
		log.Printf("fail: db.Exec, %v\n", err)
		log.Printf("follower_id=%v, followed_id=%v\n", FollowerID, FollowedID)
		return err
	}
	return nil
}

func RemoveFollow(FollowerID string, FollowedID string) error {
	// フォローを削除するSQLクエリ
	query := "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?"

	log.Printf("FollowerID=%v FollowedID=%v", FollowerID, FollowedID)
	// データベース操作を実行
	result, err := db.DB.Exec(query, FollowerID, FollowedID)
	if err != nil {
		log.Printf("Error executing query: %v", err)
		log.Printf("Query: %s, FollowerID: %s, FollowedID: %s", query, FollowerID, FollowedID)
		return err
	}

	// 削除された行数を確認（必要に応じてログに出力）
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Printf("Error fetching affected rows: %v", err)
		return err
	}
	log.Printf("Rows affected: %d", rowsAffected)

	return nil
}

// 自分がフォローしているユーザー全員を取得
func GetFollowing(followerID string) ([]models.User, error) {
	query := `SELECT u.user_id, u.user_name FROM follows f JOIN users u ON f.followed_id = u.user_id WHERE f.follower_id = ?`

	rows, err := db.DB.Query(query, followerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.UserName); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

// 自分がフォローしているユーザー全員を取得
func GetFollowed(followedID string) ([]models.User, error) {
	query := `SELECT u.user_id, u.user_name FROM follows f JOIN users u ON f.follower_id = u.user_id WHERE f.followed_id = ?`

	rows, err := db.DB.Query(query, followedID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.UserName); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}
