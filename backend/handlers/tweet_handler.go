package handlers

import (
	"backend/dao"
	"backend/models"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

// POST リクエスト処理: 投稿を保存する
func SaveTweetHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// POSTメソッドの確認
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// リクエストボディのデコード
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

	// 投稿データを保存
	if err := dao.SavePost(req.UserID, req.Content, req.CreatedAt); err != nil {
		log.Printf("Error saving post: %v", err)
		http.Error(w, "Failed to save post", http.StatusInternalServerError)
		return
	}

	// 成功レスポンス
	res := models.PostResponse{
		Status:  "success",
		Message: "Post saved successfully",
	}

	if err := json.NewEncoder(w).Encode(res); err != nil {
		log.Printf("Error encoding JSON response: %v", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

// GET リクエスト処理: 投稿を取得する
func GetAllTweetHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// GETメソッドの確認
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 投稿データを取得
	posts, err := dao.GetAllTweetsWithUserName()
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

// GET リクエスト処理: ID に合致するツイートを取得
func GetTweetByIdHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

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

	tweetIDStr := r.URL.Query().Get("tweet_id")
	if tweetIDStr == "" {
		http.Error(w, "Missing tweet_id parameter", http.StatusBadRequest)
		return
	}

	tweetID, err := strconv.Atoi(tweetIDStr)
	if err != nil {
		http.Error(w, "Invalid tweet_id parameter", http.StatusBadRequest)
		return
	}

	// tweet_id の確認
	if tweetID <= 0 {
		http.Error(w, "Invalid or missing tweet_id", http.StatusBadRequest)
		return
	}

	// ツイートデータを取得
	tweet, err := dao.GetTweetById(tweetID)
	if err != nil {
		log.Printf("Error retrieving tweet with ID %d: %v", tweetID, err)
		http.Error(w, "Failed to retrieve tweet", http.StatusInternalServerError)
		return
	}

	// JSON形式でレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tweet); err != nil {
		log.Printf("Error encoding tweet to JSON: %v", err)
		http.Error(w, "Failed to encode tweet", http.StatusInternalServerError)
		return
	}
}

// GetFollowingTweetsHandler はフォローしているユーザーのツイートを取得するハンドラです
func GetFollowingTweetsHandler(w http.ResponseWriter, r *http.Request) {
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

	// クエリパラメータからuser_idを取得
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	// データベースからツイートを取得
	tweets, err := dao.GetFollowingTweets(userID)
	if err != nil {
		log.Printf("Failed to get tweets for user %s: %v\n", userID, err)
		http.Error(w, "Failed to fetch tweets", http.StatusInternalServerError)
		return
	}

	// レスポンスをJSON形式で返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tweets); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
