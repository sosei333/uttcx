package handlers

import (
	"backend/dao"
	"backend/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
)

func SaveReplyHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
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

	var reply models.NewReplyRequest
	if err := json.NewDecoder(r.Body).Decode(&reply); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	reply.CreatedAt = time.Now().Format("2006-01-02 15:04:05")

	insertedID, err := dao.SaveReply(reply.ParentID, reply.UserID, reply.Content, reply.CreatedAt)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to save reply: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Reply saved successfully",
		"id":      insertedID,
	})
}

func GetRepliesByParentIdHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

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

	// クエリパラメータから tweet_id を取得
	tweetIDStr := r.URL.Query().Get("tweet_id")
	if tweetIDStr == "" {
		http.Error(w, "Missing tweet_id parameter", http.StatusBadRequest)
		return
	}

	// tweet_id を数値に変換
	tweetID, err := strconv.Atoi(tweetIDStr)
	if err != nil {
		http.Error(w, "Invalid tweet_id parameter", http.StatusBadRequest)
		return
	}

	// DAO からリプライを取得
	replies, err := dao.GetRepliesByParentID(tweetID)
	if err != nil {
		log.Printf("Error retrieving replies for tweet_id %d: %v", tweetID, err)
		http.Error(w, "Failed to retrieve replies", http.StatusInternalServerError)
		return
	}

	// JSONレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(replies); err != nil {
		log.Printf("Error encoding replies to JSON: %v", err)
		http.Error(w, "Failed to encode replies", http.StatusInternalServerError)
		return
	}
}
