import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReplies} from "../services/reply"; // API 呼び出し
import { getTweetById } from "../services/tweet";
import ReplyBox from "../components/organisms/ReplyBox";
import { Box, Divider, Typography, useTheme, Paper } from "@mui/material";
//import { colors } from "../layouts/colors";
import TweetBox from "../components/organisms/TweetBox";
import TweetList from "../components/organisms/TweetsList";

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
    const theme=useTheme();

    const { id } = useParams<{ id: string }>();
    const [tweet, setTweet] = useState<Tweet | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const navigate = useNavigate();

    const handleViewDetails = (tweetId: number) => {
        navigate(`/tweet/${tweetId}`);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const tweetData = await getTweetById(Number(id));
                const repliesData = await getReplies(Number(id));
                setTweet(tweetData);
                setReplies(repliesData || []);
            } catch (error) {
                console.error("Failed to fetch tweet details:", error);
            }
        };

        fetchDetails();
    }, [id]);

    return (
        <Box
            sx={{
                display: "flex",
                width: "80vw",
                overflow: "hidden",
            }}
        >
            {/* サイドバー */}
            <TweetList onViewDetails={handleViewDetails} />

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
                    <Box marginBottom={2}>
                        <Typography p={1} sx={{ color: theme.palette.text.primary }}>
                            投稿詳細
                        </Typography>
                        <TweetBox
                            tweet_id={tweet.id}
                            content={tweet.content}
                            likeCount={tweet.likes_count}
                            author={tweet.user_name}
                            authorId={tweet.user_id}
                            date={new Date(tweet.created_at).toLocaleDateString()}
                        />
                    </Box>
                )}
       
                <Divider />
                <Box sx={{ flexGrow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    {/*<Typography variant="h5" fontWeight="bold" p={1}>リプライ</Typography>*/}
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
