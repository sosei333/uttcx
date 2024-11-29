export const sendToGemini = async (searchQuery: string) => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    if (!backendUrl) {
      console.error("Backend URL is not defined in the environment variables");
      return { summary: null, log: "Backend URL is missing" };
    }
  
    try {
      // Fetchでリクエスト送信
      const response = await fetch(`${backendUrl}/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Keyword: searchQuery,
        }),
      });
  
      // レスポンスの確認
      if (response.ok) {
        const data = await response.json(); // レスポンスをJSONとして解析
        console.log("Gemini searched successfully:", data);
        return data; // サーバーからのレスポンスデータを返す
      } else {
        const errorText = await response.text(); // エラー詳細を取得
        console.error("Failed to connect to Gemini:", response.status, errorText);
        return { summary: null, log: `Failed to connect to Gemini: ${response.status}` };
      }
    } catch (error) {
      // 'unknown' 型のエラーを安全に処理
      if (error instanceof Error) {
        console.error("An error occurred while connecting to Gemini:", error.message);
        return { summary: null, log: `Error: ${error.message}` };
      } else {
        console.error("An unexpected error occurred:", error);
        return { summary: null, log: "An unexpected error occurred" };
      }
    }
  };
  