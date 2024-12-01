package handlers

import (
	"backend/dao"
	"backend/models"
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql" // MySQL ドライバー
)

// フォローを追加するハンドラ
func AddFollowHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
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

	// リクエストボディをパース
	var req models.FollowRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err := dao.AddFollow(req.FollowerID, req.FollowedID)
	if err != nil {
		log.Printf("Failed to add follow: %v\n", err) // ログにエラー出力
		http.Error(w, "Failed to add follow", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Follow added successfully"))
}

// フォローを削除するハンドラ
func RemoveFollowHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
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

	// リクエストボディをパース
	var req models.FollowRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err := dao.RemoveFollow(req.FollowerID, req.FollowedID)
	if err != nil {
		log.Printf("Failed to remove follow: %v\n", err)
		http.Error(w, "Failed to remove follow", http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Follow removed successfully"))
}

// フォローしている全ユーザーを取得するハンドラ
func GetFollowingHandler(w http.ResponseWriter, r *http.Request) {
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

	// クエリパラメータからfollower_idを取得
	followerID := r.URL.Query().Get("follower_id")
	if followerID == "" {
		http.Error(w, "Missing follower_id", http.StatusBadRequest)
		return
	}

	// DAOを呼び出してフォローしているユーザーを取得
	users, err := dao.GetFollowing(followerID)
	if err != nil {
		log.Printf("Failed to get following users: %v\n", err)
		http.Error(w, "Failed to get following users", http.StatusInternalServerError)
		return
	}

	// レスポンスをJSON形式で返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func GetFollowedHandler(w http.ResponseWriter, r *http.Request) {
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

	// クエリパラメータからfollower_idを取得
	followedID := r.URL.Query().Get("followed_id")
	if followedID == "" {
		http.Error(w, "Missing followed_id", http.StatusBadRequest)
		return
	}

	// DAOを呼び出してフォローしているユーザーを取得
	users, err := dao.GetFollowed(followedID)
	if err != nil {
		log.Printf("Failed to get followed users: %v\n", err)
		http.Error(w, "Failed to get followed users", http.StatusInternalServerError)
		return
	}

	// レスポンスをJSON形式で返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
