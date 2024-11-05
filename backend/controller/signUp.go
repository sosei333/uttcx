package handlers

import (
	"be/db"
	"encoding/json"
	"net/http"
)

type SignUpRequest struct {
	UserID string `json:"user_id"`
}

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var req SignUpRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if err := insertUser(req.UserID); err != nil {
		http.Error(w, "Failed to insert user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))
}

func insertUser(userID string) error {
	query := "INSERT INTO users (user_id, user_name) VALUES (?, ?)"
	_, err := db.DB.Exec(query, userID, "test_name")
	return err
}
