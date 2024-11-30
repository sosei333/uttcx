package models

// LikeRequest はリクエストボディの構造体
type LikeRequest struct {
	UserID  string `json:"user_id"`
	TweetID int    `json:"tweet_id,omitempty"` // NULL 値を許容
}
