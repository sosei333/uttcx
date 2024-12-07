import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReplies} from "../services/reply"; // API 呼び出し
import { getTweetById } from "../services/tweet";
import ReplyBox from "../components/organisms/ReplyBox";
import { Box, Divider, Typography, useTheme, Paper } from "@mui/material";
//import { colors } from "../layouts/colors";
import TweetBox from "../components/organisms/TweetBox";
import TweetList from "../components/organisms/TweetsList";
import { getLike } from "../services/like";

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
    likes_count: number;
};

type Reply = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
};

const TweetAndReplies: React.FC = () => {
    const theme = useTheme();

    const { id } = useParams<{ id: string }>();
    const [tweet, setTweet] = useState<Tweet | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [likedTweetIds, setLikedTweetIds] = useState<Set<number>>(new Set());
    const navigate = useNavigate();

    const handleViewDetails = (tweetId: number) => {
        navigate(`/tweet/${tweetId}`);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // 投稿詳細とリプライの取得
                const tweetData = await getTweetById(Number(id));
                const repliesData = await getReplies(Number(id));
                setTweet(tweetData);
                setReplies(repliesData || []);
            } catch (error) {
                console.error("Failed to fetch tweet details:", error);
            }
        };

        const fetchLikedTweets = async () => {
            try {
                // いいねしたツイートIDを取得
                const likedIds = await getLike();
                setLikedTweetIds(new Set(likedIds));
            } catch (error) {
                console.error("Failed to fetch liked tweets:", error);
            }
        };

        fetchDetails();
        fetchLikedTweets();
    }, [id]);

    return (
        <Box
            sx={{
                display: "flex",
                width: "80vw",
                overflow: "hidden",
            }}
        >
            <Box sx={{width: '40vw'}}>
            <TweetList onViewDetails={handleViewDetails} />
            </Box>
            {/* サイドバー */}
            

            {/* 投稿詳細とリプライ */}
            <Box
                sx={{
                    width: "40vw",
                    backgroundColor: theme.palette.background.default,
                    borderLeft: "1px solid #ccc",
                    display: "flex",
                    flexDirection: "column",
                    height: "90vh",
                    overflow: "hidden",
                }}
            >
                {tweet && (
                    <Box marginBottom={0}>
                        <TweetBox
                            tweet_id={tweet.id}
                            content={tweet.content}
                            likeCount={tweet.likes_count}
                            author={tweet.user_name}
                            authorId={tweet.user_id}
                            date={new Date(tweet.created_at).toLocaleDateString()}
                            showFollowButton={false}
                            isInitialyLiked={likedTweetIds.has(tweet.id)} // いいね状態を渡す
                        />
                    </Box>
                )}

                <Box sx={{ flexGrow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <Paper
                        elevation={3}
                        sx={{
                            flexGrow: 1,
                            overflowY: "auto",
                            padding: 2,
                            margin: 2,
                            borderRadius: 2,
                            backgroundColor: theme.palette.primary.light,
                        }}
                    >
                        {replies.length > 0 ? (
                            replies.map((reply) => (
                                <Box key={reply.id} sx={{ marginBottom: 2 }}>
                                    <ReplyBox
                                        authorId={reply.user_id}
                                        tweet_id={reply.id}
                                        content={reply.content}
                                        author={reply.user_name}
                                        date={new Date(reply.created_at).toLocaleDateString()}
                                    />
                                </Box>
                            ))
                        ) : (
                            <Typography textAlign="center" color={theme.palette.text.secondary}>
                                リプライはまだありません。
                            </Typography>
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default TweetAndReplies;
