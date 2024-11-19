import { getAuth } from 'firebase/auth';

export const postToBackend = async (content: string) => {
    // FirebaseからユーザーIDを取得
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.error("User is not authenticated");
        return;
    }

    const userId = currentUser.uid; // FirebaseのユーザーID

    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return;
    }

    const createdAt = new Date().toISOString().replace('T', ' ').replace('Z', '');


    // Fetchでリクエスト送信
    const response = await fetch(`${backendUrl}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            UserID: userId,
            Content: content,
            CreatedAt: createdAt
        }),
    });

    // レスポンスの確認
    if (response.ok) {
        console.log("Posted successfully");
    } else {
        console.error("Failed to post", response.status);
    }
};

export const getTweet = async () => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return [];
    }

    try {
        // Fetchでバックエンドから投稿を取得
        const response = await fetch(`${backendUrl}/post`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // レスポンスの確認
        if (!response.ok) {
            console.error("Failed to fetch tweets", response.status);
            return [];
        }

        // JSONデータを取得
        const data = await response.json();
        console.log("Fetched tweets successfully:", data);

        // フロントエンドで使用可能な形式のデータを返す
        return data;
    } catch (error) {
        console.error("Error fetching tweets:", error);
        return [];
    }
};
