package models

// フォローリクエストの構造体
type FollowRequest struct {
	FollowerID string `json:"follower_id"`
	FollowedID string `json:"followed_id"`
}
