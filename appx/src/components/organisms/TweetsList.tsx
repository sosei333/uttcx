import React, { useEffect, useState } from "react";
import { Box, CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TweetBox from "../organisms/TweetBox";
import { getAllTweet, getFollowingTweets } from "../../services/tweet";
import { getAuth } from "firebase/auth";
import { UserProfile } from "../../models/user_models";
import { getUserNameByID } from "../../services/user";


type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
};

type TweetListWithToggleProps = {
    onViewDetails: (tweetId: number) => void;
};

const TweetList: React.FC<TweetListWithToggleProps> = ({ onViewDetails }) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [mode, setMode] = useState<"all" | "following">("all");
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

    const auth = getAuth();
    const firebaseUser = auth.currentUser;

    // Firebaseユーザーの情報を取得
    useEffect(() => {
        if (!firebaseUser) {
            console.error("User is not authenticated");
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
            try {
                const userId = firebaseUser.uid;
                const userName = await getUserNameByID(userId);
                if (userName) {
                    setCurrentUser({ user_id: userId, user_name: userName });
                } else {
                    console.error("ユーザー情報の取得に失敗しました");
                }
            } catch (error) {
                console.error("エラーが発生しました:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [firebaseUser]);

    // ツイートの取得
    useEffect(() => {
        const fetchTweets = async () => {
            if (!currentUser) return; // currentUser が null の場合は何もしない
            setLoading(true);
            try {
                const data =
                    mode === "all" ? await getAllTweet() : await getFollowingTweets(currentUser.user_id); // 適宜変更
                setTweets(data);
            } catch (error) {
                console.error("ツイートの取得に失敗しました:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTweets();
    }, [mode, currentUser]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={2}
            height="90vh"
            width="40vw"
        >
            {/* トグルボタン */}
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, newMode) => newMode && setMode(newMode)}
                sx={{ width: "100%", marginBottom: 2 }}
            >
                <ToggleButton value="all" sx={{ flex: 1 }}>
                    すべての投稿
                </ToggleButton>
                <ToggleButton value="following" sx={{ flex: 1 }}>
                    フォロー中
                </ToggleButton>
            </ToggleButtonGroup>
            {/* ツイート一覧 */}
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                padding={2}
                width="100%"
                height="100%"
                border="1px solid #ccc"
                borderRadius={2}
            >
                {loading ? (
                    <CircularProgress />
                ) : tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <TweetBox
                            key={tweet.id}
                            tweet_id={tweet.id}
                            content={tweet.content}
                            author={tweet.user_name}
                            authorId={tweet.user_id}
                            date={new Date(tweet.created_at).toLocaleDateString()}
                            onViewDetails={() => onViewDetails(tweet.id)}
                        />
                    ))
                ) : (
                    <Box textAlign="center">
                        {mode === "all" ? "No tweets found." : "No tweets from following users."}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TweetList;