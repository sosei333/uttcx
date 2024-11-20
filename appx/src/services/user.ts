export const registerUserToBackend = async (userId: string, userName: string) => {
  // 環境変数からバックエンドURLを取得
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!backendUrl) {
    console.error("Backend URL is not defined in the environment variables");
    return;
  }

  // Fetchでリクエスト送信
  const response = await fetch(`${backendUrl}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ID: userId,
      UserName: userName,
    }),
  });

  // レスポンスの確認
  if (response.ok) {
    console.log("User registered successfully");
  } else {
    console.error("Failed to register user", response.status);
  }
};