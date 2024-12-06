import React, { useEffect, useState } from "react";
import { Box, CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TweetBox from "../organisms/TweetBox";
import { getAllTweet, getFollowingTweets } from "../../services/tweet";
import { getAuth } from "firebase/auth";
import { UserProfile } from "../../models/user_models";
import { getUserNameByID } from "../../services/user";
import { getFollowingUsers } from "../../services/follow";
import { getLike } from "../../services/like";
import { getLikeCount } from "../../services/like";
import { useAppContext } from "../../context/AppContext";
import { getLocalizedStrings } from "../../layouts/strings";

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

    const messages = getLocalizedStrings();


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
    
            let likedIds = new Set<number>();
            let followingIds = new Set<string>();
            let likeCounts: { [key: string]: number } = {};
    
            try {
                // いいね状態を取得
                likedIds = new Set(await getLike());
                setLikedTweetIds(likedIds);
            } catch (error) {
                console.error("いいね状態の取得に失敗しました:", error);
            }
    
            try {
                // いいね数を取得
                likeCounts = await getLikeCount();
            } catch (error) {
                console.error("いいね数の取得に失敗しました:", error);
            }
    
            try {
                // フォロー状態を取得
                const followingUsers = await getFollowingUsers();
                followingIds = new Set(followingUsers.map((user) => user.ID));
                setFollowedUserIds(followingIds);
            } catch (error) {
                console.error("フォロー状態の取得に失敗しました:", error);
            }
    
            try {
                // ツイートの取得
                let tweetsData: Tweet[] | null = null;
                if (mode === "all") {
                    tweetsData = await getAllTweet();
                } else if (mode === "following") {
                    if (followingIds.size === 0) {
                        tweetsData = await getAllTweet();
                    } else {
                        tweetsData = await getFollowingTweets(currentUser.user_id);
                    }
                }
    
                if (!tweetsData || !Array.isArray(tweetsData)) {
                    console.error("Invalid tweets data:", tweetsData);
                    tweetsData = [];
                }
    
                // ツイートにいいね数を追加
                const tweetsWithLikes = tweetsData.map((tweet) => ({
                    ...tweet,
                    likes_count: likeCounts[tweet.id] || 0, // いいね数がない場合は0
                }));
    
                setTweets(tweetsWithLikes);
            } catch (error) {
                console.error("ツイートの取得に失敗しました:", error);
                setTweets([]);
            } finally {
                setLoading(false);
                setDataLoaded(true);
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
                            {messages.allTweet}
                        </ToggleButton>
                        <ToggleButton value="following" sx={{ flex: 1 }}>
                           {messages.following}
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
