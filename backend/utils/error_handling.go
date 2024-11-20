package utils

import (
	"encoding/json"
	"net/http"
)

// ErrorResponse はエラーレスポンスの標準構造
type ErrorResponse struct {
	Error string `json:"error"`
}

// HandleBadRequest は 400 Bad Request レスポンスを送信
func HandleBadRequest(w http.ResponseWriter, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}

// HandleInternalServerError は 500 Internal Server Error レスポンスを送信
func HandleInternalServerError(w http.ResponseWriter, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}
