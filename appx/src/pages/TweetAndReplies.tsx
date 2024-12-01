import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReplies} from "../services/reply"; // API 呼び出し
import { getTweetById } from "../services/tweet";
import ReplyBox from "../components/organisms/ReplyBox";
import { Box, Divider, Typography } from "@mui/material";
import { colors } from "../layouts/colors";
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
                    backgroundColor: colors.background,
                    borderLeft: "1px solid #ccc",
                    display: "flex",
                    flexDirection: "column",
                    height: "90vh",
                    overflow: "hidden",
                }}
            >
                {tweet && (
                    <Box marginBottom={4}>
                        <Typography p={1} sx={{ color: colors.text }}>
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
                    <Typography p={1}>リプライ</Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: "auto",
                            padding: 0,
                        }}
                    >
                        {replies.map((reply) => (
                            <ReplyBox
                                key={reply.id}
                                tweet_id={reply.id}
                                content={reply.content}
                                author={reply.user_name}
                                date={new Date(reply.created_at).toLocaleDateString()}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TweetAndReplies;
