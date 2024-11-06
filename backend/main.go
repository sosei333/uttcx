package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

// CORSミドルウェア
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Preflightリクエストに対して200ステータスを返す
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// DBにユーザーを登録する処理
	log.Printf("User registered: %v", user)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
}

func main() {
	http.Handle("/register", enableCORS(http.HandlerFunc(registerHandler)))

	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
