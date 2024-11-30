package dao

import (
	"backend/db"
	"errors"
	"fmt"
)

// AddLike はいいねを追加する
func AddLike(userID string, tweetID int) error {
	// 入力バリデーション
	if userID == "" {
		return errors.New("userID is required")
	}

	query := `INSERT INTO likes (user_id, tweet_id) VALUES (?, ?)`
	_, err := db.DB.Exec(query, userID, tweetID)

	// エラー内容を判定して適切なメッセージを返す
	if err != nil {
		if err.Error() == "UNIQUE constraint failed" {
			// いいねの重複を検出（PostgreSQL/MySQLでは実際のメッセージに応じて調整）
			return errors.New("like already exists for this user and target")
		}
		if err.Error() == "FOREIGN KEY constraint failed" {
			// 無効な tweet_id または reply_id
			return errors.New("invalid tweetID or replyID provided")
		}
		// 一般的なエラー
		return fmt.Errorf("failed to add like: %v", err)
	}

	return nil
}

// RemoveLike はいいねを解除する
func RemoveLike(userID string, tweetID int) error {
	// 入力バリデーション
	if userID == "" {
		return errors.New("userID is required")
	}

	query := `DELETE FROM likes WHERE user_id = ? AND tweet_id = ? `
	result, err := db.DB.Exec(query, userID, tweetID)
	if err != nil {
		return fmt.Errorf("failed to remove like: %v", err)
	}

	// 行が削除されなかった場合
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to determine rows affected: %v", err)
	}
	if rowsAffected == 0 {
		return errors.New("like not found or already removed")
	}

	return nil
}
