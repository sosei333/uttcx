package dao

import (
	"backend/db"
	"backend/models"
	"database/sql"
	"log"
)

func GetUserImgByID(userId string) (models.ImgURL, error) {
	var imgURL models.ImgURL

	// クエリ文
	query := "SELECT url FROM users WHERE user_id = ?"

	// クエリの実行
	row := db.DB.QueryRow(query, userId)

	// 結果を取得
	err := row.Scan(&imgURL.ImgURL) // Scanで値を取得
	if err != nil {
		if err == sql.ErrNoRows {
			log.Printf("No user found with ID: %v\n", userId)
			return imgURL, nil // ユーザーが見つからない場合はエラーメッセージを表示せず空の構造体を返す
		}
		log.Printf("Failed to execute query: %v\n", err)
		return imgURL, err
	}

	return imgURL, nil
}

func UpdateUserImgByID(userID string, imageURL string) error {
	query := "UPDATE users SET url = ? WHERE user_id = ?"
	_, err := db.DB.Exec(query, imageURL, userID) // db は *sql.DB のインスタンス
	return err
}
