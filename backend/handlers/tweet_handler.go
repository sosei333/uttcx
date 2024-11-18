package handlers

import (
	"backend/dao"
	"backend/models"
	//"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

// 投稿レスポンスの構造体
type PostResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// 投稿を処理するハンドラー
func PostHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case http.MethodPost:
		var req models.PostRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// バリデーション
		if req.UserID == "" || req.Content == "" {
			http.Error(w, "Missing userId or content", http.StatusBadRequest)
			return
		}

		// 投稿データをデータベースに保存
		if err := dao.SavePost(req.UserID, req.Content, req.CreatedAt); err != nil {
			log.Printf("Error saving post: %v", err)
			http.Error(w, "Failed to save post", http.StatusInternalServerError)
			return
		}

		// 成功レスポンス
		res := PostResponse{
			Status:  "success",
			Message: "Post saved successfully",
		}

		if err := json.NewEncoder(w).Encode(res); err != nil {
			log.Printf("Error encoding JSON response: %v", err)
			http.Error(w, "Failed to encode response", http.StatusInternalServerError)
			return
		}

	case http.MethodGet:

		posts, err := dao.GetAllPost()
		if err != nil {
			log.Printf("Error retrieving posts: %v", err)
			http.Error(w, "Failed to retrieve posts", http.StatusInternalServerError)
			return
		}

		// JSON形式でレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(posts); err != nil {
			log.Printf("Error encoding posts to JSON: %v", err)
			http.Error(w, "Failed to encode posts", http.StatusInternalServerError)
			return
		}
	}
}
