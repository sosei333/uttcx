import React, { useEffect, useState } from 'react';
import { getAllTweet } from '../services/tweet';
import TweetBox from '../components/organisms/TweetBox';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import UserBox from '../components/organisms/UserBox';
import { UserProfile } from "../models/user_models";
import { getUserNameByID } from '../services/user';
import UserDetailsBox from '../components/organisms/UserDetailsBox';

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
};

const UserDetails: React.FC = () => {
    const { userID } = useParams<{ userID: string }>();
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingTweets, setLoadingTweets] = useState(true);
    const navigate = useNavigate();

    // ユーザー情報を取得する関数
    const fetchUser = async () => {
        setLoadingUser(true);
        try {
            const userName = await getUserNameByID(userID || "");
            if (userName) {
                setCurrentUser({ user_id: userID || "", user_name: userName });
            } else {
                console.error("ユーザー情報の取得に失敗しました");
            }
        } catch (error) {
            console.error("エラーが発生しました:", error);
        } finally {
            setLoadingUser(false);
        }
    };

    // 投稿を取得する関数
    const fetchTweets = async () => {
        setLoadingTweets(true);
        try {
            const data = await getAllTweet();
            const userTweets = data.filter((tweet: Tweet) => tweet.user_id === userID);
            setTweets(userTweets);
        } catch (error) {
            console.error("投稿の取得に失敗しました:", error);
        } finally {
            setLoadingTweets(false);
        }
    };

    // ユーザー情報と投稿を取得
    useEffect(() => {
        if (userID) {
            fetchUser();
            fetchTweets();
        }
    }, [userID]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={2}
        >
            {/* ユーザー情報 */}
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginBottom: 4,
                    width: '60vh',
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: '#f9f9f9',
                }}
            >
                {loadingUser ? (
                    <CircularProgress />
                ) : currentUser ? (
                    <UserDetailsBox userName={currentUser.user_name} userId={currentUser.user_id} />
                ) : (
                    <Typography color="error">ユーザー情報を取得できませんでした。</Typography>
                )}
            </Paper>

            {/* ユーザーの投稿 */}
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                padding={2}
                width="60vh"
                maxHeight="60vh"
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 3,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                {loadingTweets ? (
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
                            onViewDetails={() => navigate(`/tweet/${tweet.id}`)}
                        />
                    ))
                ) : (
                    <Typography color="textSecondary" textAlign="center">
                        このユーザーはまだ投稿していません。
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default UserDetails;
