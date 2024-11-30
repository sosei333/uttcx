package models

type Reply struct {
	ID        int    `json:"id"`
	ParentID  int    `json:"parent_id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	UserName  string `json:"user_name"`
}

// リクエストで受け取るデータの構造体
type NewReplyRequest struct {
	UserID    string `json:"user_id"`
	ParentID  int    `json:"parent_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"` // クライアントから日時を受け取る場合
}

// レスポンスで返すデータの構造体
type NewReplyResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	ReplyID int64  `json:"reply_id,omitempty"`
}
