import React, { useEffect, useState } from "react";
import { Box, CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TweetBox from "../organisms/TweetBox";
import { getAllTweet, getFollowingTweets } from "../../services/tweet";
import { getAuth } from "firebase/auth";
import { UserProfile } from "../../models/user_models";
import { getUserNameByID } from "../../services/user";
import { getFollowingUsers } from "../../services/follow";
import { getLike } from "../../services/like";

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
    likes_count?: number;
};

type TweetListWithToggleProps = {
    onViewDetails: (tweetId: number) => void;
};

const TweetList: React.FC<TweetListWithToggleProps> = ({ onViewDetails }) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [mode, setMode] = useState<"all" | "following">("all");
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // すべてのデータが揃ったかを判定
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [followedUserIds, setFollowedUserIds] = useState<Set<string>>(new Set());
    const [likedTweetIds, setLikedTweetIds] = useState<Set<number>>(new Set());

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

    // データの一括取得 (いいね状態, フォロー状態, ツイート)
    useEffect(() => {
        const fetchAllData = async () => {
            if (!currentUser) return;
            setLoading(true);
            try {
                const [likedIds, followingUsers, tweetsData] = await Promise.all([
                    getLike(),
                    getFollowingUsers(),
                    mode === "all" ? getAllTweet() : getFollowingTweets(currentUser.user_id),
                ]);

                // いいね状態とフォロー状態を設定
                setLikedTweetIds(new Set(likedIds));
                const followingIds = new Set(followingUsers.map((user) => user.ID));
                setFollowedUserIds(followingIds);

                // ツイートを設定
                setTweets(tweetsData || []);
            } catch (error) {
                console.error("データの取得に失敗しました:", error);
                setTweets([]);
            } finally {
                setLoading(false);
                setDataLoaded(true); // データが揃ったら true に設定
            }
        };

        fetchAllData();
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
            {/* ローディング中のインジケータ */}
            {loading || !dataLoaded ? (
                <CircularProgress />
            ) : (
                <>
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
                        {tweets.length > 0 ? (
                            tweets.map((tweet) => (
                                <TweetBox
                                    key={tweet.id}
                                    tweet_id={tweet.id}
                                    content={tweet.content}
                                    author={tweet.user_name}
                                    authorId={tweet.user_id}
                                    likeCount={tweet.likes_count}
                                    date={new Date(tweet.created_at).toLocaleDateString()}
                                    isFollowingAuthor={followedUserIds.has(tweet.user_id)}
                                    onViewDetails={() => onViewDetails(tweet.id)}
                                    isInitialyLiked={likedTweetIds.has(tweet.id)}
                                />
                            ))
                        ) : (
                            <Box textAlign="center">
                                {mode === "all" ? "No tweets found." : "No tweets from following users."}
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TweetList;
