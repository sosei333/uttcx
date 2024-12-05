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

type UpdateUserIntroduction struct {
	UserIntroduction string `json:"userIntroduction"`
}

// UserSettings represents the user settings that can be updated.
type UserSettings struct {
	Language string `json:"language,omitempty"`
	Theme    string `json:"theme,omitempty"`
	FontSize string `json:"fontSize,omitempty"`
}
