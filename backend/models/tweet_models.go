package models

// POST リクエスト用構造体
type PostRequest struct {
	UserID    string `json:"user_id"` // JSON のキーを小文字で統一
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}

// 投稿データの構造体
type Post struct {
	ID        int    `json:"id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}

// POST レスポンス用構造体
type PostResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type TweetByIdRequest struct {
	TweetID int `json:"tweet_id"`
}

type Tweet struct {
	ID        int    `json:"id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	UserName  string `json:"user_name"`
}

type TweetWithLikes struct {
	ID         int    `json:"id"`
	UserID     string `json:"user_id"`
	Content    string `json:"content"`
	CreatedAt  string `json:"created_at"`
	UserName   string `json:"user_name"`
	LikesCount int    `json:"likes_count"`
}

type TweetWithUserName struct {
	ID        int    `json:"id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	UserName  string `json:"user_name"`
}

type FollowingTweet struct {
	ID        int    `json:"id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}

type TweetID struct {
	ID int `json:"id"`
}
