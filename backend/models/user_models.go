package models

type User struct {
	ID       string `json:"ID"`
	UserName string `json:"UserName"`
}

type UserName struct {
	UserName string `json:"UserName"`
}

type UpdateUserNameRequest struct {
	UserName string `json:"userName"`
}
