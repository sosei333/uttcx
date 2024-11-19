package dao

import (
	"backend/db"
	"backend/models"
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
