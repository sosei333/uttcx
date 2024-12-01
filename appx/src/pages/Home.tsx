import React, { useEffect, useState } from 'react';
import { getAllTweet, getFollowingTweets } from '../services/tweet';
import TweetBox from '../components/organisms/TweetBox';
import { Box, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { UserProfile } from '../models/user_models';
import { getUserNameByID } from '../services/user';

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
};

const Tweets: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [mode, setMode] = useState<'all' | 'following'>('all');
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

    const navigate = useNavigate();
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

    // ツイートを取得する関数
    const fetchTweets = async () => {
        if (!currentUser) return; // currentUser が null の場合は何もしない
        setLoading(true);
        try {
            const data =
                mode === 'all'
                    ? await getAllTweet()
                    : await getFollowingTweets(currentUser.user_id);
            setTweets(data);
        } catch (error) {
            console.error("ツイートの取得に失敗しました:", error);
        } finally {
            setLoading(false);
        }
    };

    // モード切り替え時と currentUser 更新時にツイートを取得
    useEffect(() => {
        fetchTweets();
    }, [mode, currentUser]);

    const handleViewDetails = (tweetId: number) => {
        navigate(`/tweet/${tweetId}`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={2}
            height="90vh"
            width="80vh"
        >
            {/* 表示モード切り替えボタン */}
            <Box
            zIndex={10}
            width="100%"
            height='10vh'
            padding={1}
            >
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, newMode) => newMode && setMode(newMode)}
                sx={{ justifyContent: 'center' }}
            >
                <ToggleButton value="all">All Tweets</ToggleButton>
                <ToggleButton value="following">Following</ToggleButton>
            </ToggleButtonGroup>
        </Box>
            {/* ツイート表示 */}
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                padding={2}
                width="100%"
                height='80vh'
                maxHeight="80vh"
                border="1px solid #ccc"
                borderRadius={2}
                boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
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
                            onViewDetails={() => handleViewDetails(tweet.id)}
                        />
                    ))
                ) : (
                    <Box textAlign="center">
                        {mode === 'all' ? "No tweets found." : "No tweets from following users."}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Tweets;
