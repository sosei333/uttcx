import { getAuth } from 'firebase/auth';

export const getReplies = async (parentId: number) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return [];
    }

    try {
        const response = await fetch(`${backendUrl}/reply?tweet_id=${parentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch replies", response.status);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        return [];
    }
};

export const postReply = async (parentId: number, content: string) => {
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
    const response = await fetch(`${backendUrl}/reply/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            parent_id: parentId,
            content: content,
            created_at: createdAt
        }),
    });

    // レスポンスの確認
    if (response.ok) {
        console.log("Posted successfully");
    } else {
        console.error("Failed to post", response.status);
    }
};
