package models

type User struct {
	ID       string `json:"ID"`
	UserName string `json:"UserName"`
}

type PostRequest struct {
	UserID    string `json:"UserId"`
	Content   string `json:"Content"`
	CreatedAt string `json:"CreatedAt"`
}

type Post struct {
	ID        int    `json:"id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}
