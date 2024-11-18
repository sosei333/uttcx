package handlers

import (
	"backend/dao"
	"backend/models"
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

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// リクエストボディのパース
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

	log.Println("Response Headers:")
	for key, values := range w.Header() {
		for _, value := range values {
			log.Printf("%s: %s\n", key, value)
		}
	}

}
