import React, { useEffect, useState } from 'react';
import { getAllTweet } from '../services/tweet';
import TweetBox from '../components/organisms/TweetBox';
import { Box, CircularProgress, Typography, Paper, useTheme } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import UserDetailsBox from '../components/organisms/UserDetailsBox';
import { UserProfile } from "../models/user_models";
import { getUserNameByID } from '../services/user';
import { getFollowingUsers } from '../services/follow';
import { getLocalizedStrings} from '../layouts/strings';

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
    const [followingUserIds, setFollowingUserIds] = useState<Set<string>>(new Set()); // フォロー中のユーザーIDを保存
    const navigate = useNavigate();
    const strings = getLocalizedStrings();

    const theme=useTheme();

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

    // フォロー中のユーザーリストを取得する関数
    const fetchFollowingUsers = async () => {
        try {
            const followingUsers = await getFollowingUsers();
            const followingIds = new Set(followingUsers.map((user) => user.ID));
            setFollowingUserIds(followingIds);
        } catch (error) {
            console.error("Failed to fetch following users:", error);
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

    // ユーザー情報、投稿、フォロー中リストを取得
    useEffect(() => {
        if (userID) {
            fetchUser();
            fetchTweets();
            fetchFollowingUsers();
        }
    }, [userID]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={2}
            sx={{textAlign: 'center'}}
        >
            {/* ユーザー情報 */}
            {/* <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginBottom: 4,
                    width: '60vh',
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: '#f9f9f9',
                }}
            > */}
                {loadingUser ? (
                    <CircularProgress />
                ) : currentUser ? (
                    <UserDetailsBox userName={currentUser.user_name} userId={currentUser.user_id} />
                ) : (
                    <Typography color="error">ユーザー情報を取得できませんでした。</Typography>
                )}
            {/* </Paper> */}

            {/* ユーザーの投稿 */}
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                padding={2}
                width="60vh"
                maxHeight="57vh"
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 3,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    border: `3px solid ${theme.palette.primary.light}`
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
                            isFollowingAuthor={followingUserIds.has(tweet.user_id)} // フォロー状態を渡す
                            onViewDetails={() => navigate(`/tweet/${tweet.id}`)}
                            showFollowButton={false}
                        />
                    ))
                ) : (
                    <Typography color="textSecondary" textAlign="center">
                        {strings.noTweets}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default UserDetails;
