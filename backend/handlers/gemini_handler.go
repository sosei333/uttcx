package handlers

import (
	"backend/models"
	"backend/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// SearchRequest は、リクエストボディから受け取る検索キーワードの構造体
type SearchRequest struct {
	Keyword string `json:"keyword"`
}

// SearchResponse は、検索結果を返す際の構造体
type SearchResponse struct {
	Results interface{} `json:"results"`
	Error   string      `json:"error,omitempty"`
}

// GeminiSearch ハンドラ
func GeminiSearch(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// POSTメソッドのみ受け付ける
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// リクエストボディをデコード
	var searchRequest SearchRequest
	if err := json.NewDecoder(r.Body).Decode(&searchRequest); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 必要な情報を設定
	projectID := "term6-sosei-aoki"    // 実際のプロジェクトIDに置き換えてください
	location := "global"               // 必要に応じて変更
	engineID := "uttcai_1732534922199" // 実際のエンジンIDに置き換えてください
	searchQuery := searchRequest.Keyword

	// 検索を実行
	response, err := utils.SearchSample(projectID, location, engineID, searchQuery)
	if err != nil {
		log.Printf("Error during search: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"summary": nil,
			"log":     fmt.Sprintf("Search failed: %v", err),
		})
		return
	}

	// 成功レスポンスを返却
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

const projectID = "term6-sosei-aoki"

func GenerateContentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

	// OPTIONSリクエストを処理
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// POSTメソッドのチェック
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// リクエストボディからプロンプトを取得
	var req models.PromptRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 結果を生成
	w.Header().Set("Content-Type", "application/json")
	err := utils.GenerateContentFromText(w, projectID, req.Prompt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
