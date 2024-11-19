package models

type Reply struct {
	ID        int    `json:"id"`
	ParentID  int    `json:"parent_id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}
