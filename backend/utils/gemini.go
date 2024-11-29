package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"cloud.google.com/go/vertexai/genai"
)

//const (
//	location  = "asia-northeast1"
//	modelName = "gemini-1.5-flash-002"
//	projectID = "term6-sosei-aoki" // ① 自分のプロジェクトIDを指定する
//)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run main.go <prompt>")
		os.Exit(1)
	}

	prompt := os.Args[1] // ② コマンドライン引数からプロンプトを取得
	err := generateContentFromText(os.Stdout, projectID, prompt)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
	}
}

func generateContentFromText(w io.Writer, projectID, promptText string) error {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, projectID, location)
	if err != nil {
		return fmt.Errorf("error creating client: %w", err)
	}

	// ③ Geminiにpromptを送る
	gemini := client.GenerativeModel(modelName)
	prompt := genai.Text(promptText)
	resp, err := gemini.GenerateContent(ctx, prompt)
	if err != nil {
		return fmt.Errorf("error generating content: %w", err)
	}

	// ④ 結果を画面に出力する
	rb, err := json.MarshalIndent(resp, "", "  ")
	if err != nil {
		return fmt.Errorf("json.MarshalIndent: %w", err)
	}
	fmt.Fprintln(w, string(rb))
	return nil
}
