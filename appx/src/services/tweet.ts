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
    const response = await fetch(`${backendUrl}/tweet/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
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

export const getAllTweet = async () => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return [];
    }

    try {
        // Fetchでバックエンドから投稿を取得
        const response = await fetch(`${backendUrl}/tweet`, {
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

export const getTweetById = async (tweetId: number) => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return null;
    }

    try {
        // Fetchでバックエンドから特定の投稿を取得
        const response = await fetch(`${backendUrl}/tweet/id?tweet_id=${tweetId}`, {
            method: "GET", // GET メソッドでリクエスト送信
            headers: {
                "Content-Type": "application/json",
            },
        });        

        // レスポンスの確認
        if (!response.ok) {
            console.error(`Failed to fetch tweet with ID ${tweetId}`, response.status);
            return null;
        }

        // JSONデータを取得
        const data = await response.json();
        console.log(`Fetched tweet with ID ${tweetId} successfully:`, data);

        // データを返す
        return data;
    } catch (error) {
        console.error(`Error fetching tweet with ID ${tweetId}:`, error);
        return null;
    }
};

export const getFollowingTweets = async (user_id:string) => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return null;
    }

    try {
        // Fetchでバックエンドから特定の投稿を取得
        const response = await fetch(`${backendUrl}/tweet/following?user_id=${user_id}`, {
            method: "GET", // GET メソッドでリクエスト送信
            headers: {
                "Content-Type": "application/json",
            },
        });        

        // レスポンスの確認
        if (!response.ok) {
            console.error(`Failed to fetch tweet with ID ${user_id}`, response.status);
            return null;
        }

        // JSONデータを取得
        const data = await response.json();
        console.log(`Fetched tweet with ID ${user_id} successfully:`, data);

        // データを返す
        return data;
    } catch (error) {
        console.error(`Error fetching tweet with ID ${user_id}:`, error);
        return null;
    }
};