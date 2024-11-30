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

export const getUserNameByID = async (userId: string): Promise<string | null> => {
  // 環境変数からバックエンドURLを取得
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!backendUrl) {
    console.error("Backend URL is not defined in the environment variables");
    return null;
  }

  try {
    // FetchでGETリクエスト送信
    const response = await fetch(`${backendUrl}/user/getusername?userId=${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // レスポンスの確認
    if (response.ok) {
      const data = await response.json(); // JSONレスポンスをパース
      if (data && data.UserName) {
        return data.UserName; // ユーザーネームを返す
      } else {
        console.error("Response did not contain a valid userName");
        return null;
      }
    } else {
      console.error(`Failed to fetch user name, status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching the user name:", error);
    return null;
  }
};


export const updateUserName = async (userId: string, newUserName: string): Promise<boolean> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await fetch(`${backendUrl}/user/update?userId=${encodeURIComponent(userId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: newUserName }),
  });

  if (!response.ok) {
    console.error("Failed to update user name");
    return false;
  }
  return true;
};
