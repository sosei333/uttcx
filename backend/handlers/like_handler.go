package handlers

import (
	"backend/dao"
	"backend/models"
	"encoding/json"
	"log"
	"net/http"
)

// AddLikeHandler はいいねを追加するハンドラー
func AddLikeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var like models.LikeRequest
	if err := json.NewDecoder(r.Body).Decode(&like); err != nil {
		log.Printf("Failed to decode request body: %v\n", err) // ログにエラー出力
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err := dao.AddLike(like.UserID, like.TweetID)
	if err != nil {
		log.Printf("Failed to add like: %v\n", err) // ログにエラー出力
		http.Error(w, "Failed to add like", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Like added successfully"})
}

// RemoveLikeHandler はいいねを解除するハンドラー
func RemoveLikeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodDelete {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var like models.LikeRequest
	if err := json.NewDecoder(r.Body).Decode(&like); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err := dao.RemoveLike(like.UserID, like.TweetID)
	if err != nil {
		http.Error(w, "Failed to remove like", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Like removed successfully"})
}

func GetLikedTweetsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// クエリパラメータから user_id を取得
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	// いいねした投稿のIDを取得
	likedTweetIDs, err := dao.GetLikedTweetIDs(userID) // dao 層を利用
	if err != nil {
		http.Error(w, "Failed to retrieve liked tweets", http.StatusInternalServerError)
		return
	}

	// レスポンスを返す
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(likedTweetIDs)
}
