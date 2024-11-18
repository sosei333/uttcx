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
