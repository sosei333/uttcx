package dao

import (
	"backend/db"
	"backend/models"
	"database/sql"
	"fmt"
	"log"
)

// CreateUser inserts a new user into the database
func CreateUser(user models.User) error {
	query := "INSERT INTO users (user_id, user_name) VALUES (?, ?)"
	_, err := db.DB.Exec(query, user.ID, user.UserName)
	if err != nil {
		log.Printf("fail: db.Exec, %v\n", err)
		log.Printf("id=%v, user_name=%v\n", user.ID, user.UserName)
		return err
	}
	return nil
}

func GetUserNameByID(userId string) (models.UserName, error) {
	var userName models.UserName

	// クエリ文
	query := "SELECT user_name FROM users WHERE user_id = ?"

	// クエリの実行
	row := db.DB.QueryRow(query, userId)

	// 結果を取得
	err := row.Scan(&userName.UserName) // Scanで値を取得
	if err != nil {
		if err == sql.ErrNoRows {
			log.Printf("No user found with ID: %v\n", userId)
			return userName, nil // ユーザーが見つからない場合はエラーメッセージを表示せず空の構造体を返す
		}
		log.Printf("Failed to execute query: %v\n", err)
		return userName, err
	}

	return userName, nil
}

func GetUserIntroductionByID(userId string) (models.UpdateUserIntroduction, error) {
	var userIntroduction models.UpdateUserIntroduction

	// クエリ文
	query := "SELECT user_introduction FROM users WHERE user_id = ?"

	// クエリの実行
	row := db.DB.QueryRow(query, userId)

	// 結果を取得
	err := row.Scan(&userIntroduction.UserIntroduction) // Scanで値を取得
	if err != nil {
		if err == sql.ErrNoRows {
			// ユーザーが見つからない場合
			log.Printf("No user found with ID: %v. Returning empty introduction.\n", userId)
			return userIntroduction, nil // 空の構造体を返すがエラーは返さない
		}
		// その他のエラーの場合
		log.Printf("Failed to execute query for user ID: %v, error: %v\n", userId, err)
		return userIntroduction, err
	}

	// 正常に取得できた場合
	log.Printf("Successfully retrieved introduction for user ID: %v\n", userId)
	return userIntroduction, nil
}

func UpdateUserName(userID string, userName string) error {
	// クエリを実行
	query := "UPDATE users SET user_name = ? WHERE user_id = ?"
	result, err := db.DB.Exec(query, userName, userID)
	if err != nil {
		log.Printf("Error executing query: %s, userID: %s, userName: %s, error: %v", query, userID, userName, err)
		return err
	}

	// 更新件数の確認
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Printf("Error fetching rows affected for userID: %s, error: %v", userID, err)
		return err
	}
	if rowsAffected == 0 {
		log.Printf("No changes detected for userID: %s, userName: %s", userID, userName)
		// エラーを返さず正常終了として扱う
		return nil
	}

	log.Printf("UserName successfully updated for userID: %s, newUserName: %s", userID, userName)
	return nil
}

func UpdateUserIntroduction(userID string, userIntroduction string) error {
	// クエリを実行
	query := "UPDATE users SET user_introduction = ? WHERE user_id = ?"
	result, err := db.DB.Exec(query, userIntroduction, userID)
	if err != nil {
		return fmt.Errorf("failed to execute update query: %w", err)
	}

	// 更新件数の確認
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to check rows affected: %w", err)
	}
	if rowsAffected == 0 {
		return fmt.Errorf("no rows updated for userID: %s", userID)
	}

	return nil
}

// UpdateUserSettings updates the user settings in the database.
func UpdateUserSettings(userID string, settings models.UserSettings) error {
	// Prepare query components
	query := "UPDATE users SET "
	args := []interface{}{}
	setClauses := ""

	// Add clauses based on provided settings
	if settings.Language != "" {
		if len(setClauses) > 0 {
			setClauses += ", "
		}
		setClauses += "language = ?"
		args = append(args, settings.Language)
	}
	if settings.Theme != "" {
		if len(setClauses) > 0 {
			setClauses += ", "
		}
		setClauses += "color_theme = ?"
		args = append(args, settings.Theme)
	}
	if settings.FontSize != "" {
		if len(setClauses) > 0 {
			setClauses += ", "
		}
		setClauses += "font_size = ?"
		args = append(args, settings.FontSize)
	}

	// If no settings are provided, return an error
	if len(setClauses) == 0 {
		return fmt.Errorf("no settings to update for userID: %s", userID)
	}

	// Finalize the query
	query += setClauses + " WHERE user_id = ?"
	args = append(args, userID)

	// Execute the query
	result, err := db.DB.Exec(query, args...)
	if err != nil {
		return fmt.Errorf("failed to execute update query: %w", err)
	}

	// Check the number of rows affected
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to check rows affected: %w", err)
	}
	if rowsAffected == 0 {
		return fmt.Errorf("no rows updated for userID: %s", userID)
	}

	return nil
}

// GetUserSettings retrieves user settings from the database by userID.
func GetUserSettings(userID string) (models.UserSettings, error) {
	query := "SELECT language, color_theme, font_size FROM users WHERE user_id = ?"
	var settings models.UserSettings

	err := db.DB.QueryRow(query, userID).Scan(&settings.Language, &settings.Theme, &settings.FontSize)
	if err != nil {
		if err == sql.ErrNoRows {
			return settings, fmt.Errorf("no user found with userID: %s", userID)
		}
		return settings, fmt.Errorf("failed to retrieve user settings: %w", err)
	}

	return settings, nil
}
