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
