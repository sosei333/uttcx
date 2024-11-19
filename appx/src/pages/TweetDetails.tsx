import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReplies } from "../services/reply"; // API 呼び出し
import { getTweetById } from "../services/tweet";
import PostBox from "../components/organisms/PostBox";
import { Box } from "@mui/material";

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
};

type Reply = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
};

const TweetDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL パラメータから投稿 ID を取得
    const [tweet, setTweet] = useState<Tweet | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const tweetData = await getTweetById(Number(id));
            const repliesData = await getReplies(Number(id));
            setTweet(tweetData);
            setReplies(repliesData);
        };

        fetchDetails();
    }, [id]);

    return (
        <Box padding={2}>
            {tweet && (
                <Box marginBottom={4}>
                    <h2>投稿詳細</h2>
                    <PostBox
                        content={tweet.content}
                        author={tweet.user_id}
                        date={new Date(tweet.created_at).toLocaleDateString()}
                    />
                </Box>
            )}

            <Box>
                <h3>リプライ</h3>
                {replies.map((reply) => (
                    <PostBox
                        key={reply.id}
                        content={reply.content}
                        author={reply.user_id}
                        date={new Date(reply.created_at).toLocaleDateString()}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TweetDetails;