import { getAuth } from "firebase/auth";

export const addFollow = async (
    followedId: string,
  ): Promise<void> => {
    try {
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

      const response = await fetch(`${backendUrl}/follow/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          follower_id: userId,
          followed_id: followedId || null, 
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add follow");
      }
  
      console.log("Follow added successfully");
    } catch (error) {
      console.error("Error adding follow:", error);
    }
};


export const removeFollow = async (
    followedId: string,
): Promise<void> => {
    try {
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

        const response = await fetch(`${backendUrl}/follow/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            follower_id: userId,
            followed_id: followedId,
        }),
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove follow");
        }

        console.log("Follow removed successfully");
    } catch (error) {
        console.error("Error removing follow:", error);
    }
};

export const getFollowingUsers = async (): Promise<{ ID: string; UserName: string }[]> => {
    try {
        // FirebaseからユーザーIDを取得
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error("User is not authenticated");
            return [];
        }

        const userId = currentUser.uid; // FirebaseのユーザーID

        // 環境変数からバックエンドURLを取得
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        if (!backendUrl) {
            console.error("Backend URL is not defined in the environment variables");
            return [];
        }

        // GET リクエストを送信
        const response = await fetch(`${backendUrl}/follow/following?follower_id=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // レスポンスを確認
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch following users");
        }

        // レスポンスをJSONとしてパース
        const followingUsers = await response.json();
        return followingUsers;
    } catch (error) {
        console.error("Error fetching following users:", error);
        return [];
    }
};