package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"io"

	"cloud.google.com/go/vertexai/genai"
)

const (
	location  = "asia-northeast1"
	modelName = "gemini-1.5-flash-002"
	projectID = "term6-sosei-aoki" // 自分のプロジェクトIDを指定
)

func GenerateContentFromText(w io.Writer, projectID, promptText string) error {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, projectID, location)
	if err != nil {
		return fmt.Errorf("error creating client: %w", err)
	}

	gemini := client.GenerativeModel(modelName)
	prompt := genai.Text(promptText)
	resp, err := gemini.GenerateContent(ctx, prompt)
	if err != nil {
		return fmt.Errorf("error generating content: %w", err)
	}

	// 必要な部分だけ抽出
	if len(resp.Candidates) == 0 {
		return fmt.Errorf("no candidates returned by Gemini")
	}

	content := resp.Candidates[0].Content.Parts
	response := map[string]interface{}{
		"Content": content,
	}

	// 抽出したデータをJSON形式で出力
	rb, err := json.Marshal(response)
	if err != nil {
		return fmt.Errorf("json.Marshal: %w", err)
	}
	w.Write(rb)
	return nil
}
