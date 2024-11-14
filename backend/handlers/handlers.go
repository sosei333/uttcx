package handlers

import (
	"backend/db"
	"backend/models" // modelsパッケージをインポート
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"net/http"
)

func UserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case http.MethodPost:
		var newUser models.User // models.Userを使用
		if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
			log.Printf("fail: json.Decode, %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// user_nameが空でないかを確認
		if newUser.UserName == "" {
			log.Println("fail: user_name cannot be empty")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("user_name cannot be empty"))
			return
		}

		_, err := db.DB.Exec("INSERT INTO users (id, user_name) VALUES (?, ?)", newUser.ID, newUser.UserName)
		if err != nil {
			log.Printf("fail: db.Exec, %v\n", err)
			log.Printf("id=%v, user_name=%v\n", newUser.ID, newUser.UserName)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("User created successfully"))

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
	}
}
