package handlers

import (
	"backend/dao"
	"backend/models"
	"encoding/json"
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
		var newUser models.User
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

		// DAO を利用してデータベース操作を行う
		if err := dao.CreateUser(newUser); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Failed to create user"))
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("User created successfully"))

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
	}
}

func GetUserNameByIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// POSTメソッドの確認
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userIDStr := r.URL.Query().Get("userId")
	if userIDStr == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	// ツイートデータを取得
	userName, err := dao.GetUserNameByID(userIDStr)
	if err != nil {
		log.Printf("Error retrieving tweet with ID %d: %v", userIDStr, err)
		http.Error(w, "Failed to retrieve tweet", http.StatusInternalServerError)
		return
	}

	// JSON形式でレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(userName); err != nil {
		log.Printf("Error encoding tweet to JSON: %v", err)
		http.Error(w, "Failed to encode tweet", http.StatusInternalServerError)
		return
	}
}

func GetUserIntroductionByIDHandler(w http.ResponseWriter, r *http.Request) {
	// CORS ヘッダーの設定
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// OPTIONS リクエストの早期処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// メソッドの確認
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// クエリパラメータの取得
	userIDStr := r.URL.Query().Get("userId")
	if userIDStr == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	// データベースから自己紹介を取得
	userIntroduction, err := dao.GetUserIntroductionByID(userIDStr)
	if err != nil {
		log.Printf("Error getting introduction for userID %s: %v", userIDStr, err)
		http.Error(w, "Failed to get introduction", http.StatusInternalServerError)
		return
	}

	// ユーザーが見つからない場合の処理
	if userIntroduction.UserIntroduction == "" {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// JSON形式でレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(userIntroduction); err != nil {
		log.Printf("Error encoding introduction to JSON: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func UpdateUserNameHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	// リクエストメソッドの検証
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// ユーザーIDを URL パラメータから取得
	userID := r.URL.Query().Get("userId")
	if userID == "" {
		http.Error(w, "Missing userId parameter", http.StatusBadRequest)
		return
	}

	// リクエストボディのパース
	var req models.UpdateUserNameRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 必須フィールドの検証
	if req.UserName == "" {
		http.Error(w, "UserName is required", http.StatusBadRequest)
		return
	}

	// DAO 経由でデータベースを更新
	err := dao.UpdateUserName(userID, req.UserName)
	if err != nil {
		log.Printf("Failed to update user name for userID %s: %v", userID, err)
		http.Error(w, "Failed to update user name", http.StatusInternalServerError)
		return
	}

	// 成功レスポンス
	w.WriteHeader(http.StatusOK)
}

func UpdateUserIntroductionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	// リクエストメソッドの検証
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// ユーザーIDを URL パラメータから取得
	userID := r.URL.Query().Get("userId")
	if userID == "" {
		http.Error(w, "Missing userId parameter", http.StatusBadRequest)
		return
	}

	// リクエストボディのパース
	var req models.UpdateUserIntroduction
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	log.Printf("Updating user introduction for userID %s: userIntro=%v", userID, req.UserIntroduction)

	if req.UserIntroduction == "" {
		http.Error(w, "UserIntroduction is required", http.StatusBadRequest)
		return
	}

	// DAO 経由でデータベースを更新
	err := dao.UpdateUserIntroduction(userID, req.UserIntroduction)
	if err != nil {
		log.Printf("Failed to update user introduction for userID %s: %v", userID, err)
		http.Error(w, "Failed to update user introduction", http.StatusInternalServerError)
		return
	}

	// 成功レスポンス
	w.WriteHeader(http.StatusOK)
}
