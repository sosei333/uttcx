package handlers

import (
	"backend/dao"
	"backend/models"
	"encoding/json"
	"log"
	"net/http"
)

func GetUserImgByIDHandler(w http.ResponseWriter, r *http.Request) {
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
	imgURL, err := dao.GetUserImgByID(userIDStr)
	if err != nil {
		log.Printf("Error retrieving tweet with ID %d: %v", userIDStr, err)
		http.Error(w, "Failed to retrieve tweet", http.StatusInternalServerError)
		return
	}

	// JSON形式でレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(imgURL); err != nil {
		log.Printf("Error encoding tweet to JSON: %v", err)
		http.Error(w, "Failed to encode tweet", http.StatusInternalServerError)
		return
	}
}

func UpdateUserImgByIDHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// PUTメソッドの確認
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userIDStr := r.URL.Query().Get("userId")
	if userIDStr == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	// リクエストボディから新しい画像情報を取得
	var payload models.ImgURL

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if payload.ImgURL == "" {
		http.Error(w, "Missing image_url field in request body", http.StatusBadRequest)
		return
	}

	// データベースに画像情報を更新
	err := dao.UpdateUserImgByID(userIDStr, payload.ImgURL)
	if err != nil {
		log.Printf("Error updating image for user ID %s: %v", userIDStr, err)
		http.Error(w, "Failed to update user image", http.StatusInternalServerError)
		return
	}

	// 成功レスポンス
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	if _, err := w.Write([]byte(`{"message": "User image updated successfully"}`)); err != nil {
		log.Printf("Error writing response: %v", err)
	}
}
