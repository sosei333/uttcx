import { getAuth } from "firebase/auth";

export const addLike = async (
    tweetId: number,
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

      const response = await fetch(`${backendUrl}/like/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          tweet_id: tweetId || null, // tweetId か replyId を送る
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add like");
      }
  
      console.log("Like added successfully");
    } catch (error) {
      console.error("Error adding like:", error);
    }
};


export const removeLike = async (
    tweetId: number,
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

        const response = await fetch(`${backendUrl}/like/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            tweet_id: tweetId,
        }),
        });

        if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove like");
        }

        console.log("Like removed successfully");
    } catch (error) {
        console.error("Error removing like:", error);
    }
};
