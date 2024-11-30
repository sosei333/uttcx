import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReplies } from "../services/reply"; // API 呼び出し
import { getTweetById } from "../services/tweet";
import ReplyBox from "../components/organisms/ReplyBox";
import { Box, Divider, Typography } from "@mui/material";
import {colors} from "../layouts/colors";
import { useNavigate } from "react-router-dom";
import { getAllTweet } from '../services/tweet';
import TweetBox from '../components/organisms/TweetBox';

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
    likes_count:number;
};

type Reply = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
};

const TweetAndReplies: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL パラメータから投稿 ID を取得
    const [tweet, setTweet] = useState<Tweet | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const navigate = useNavigate();

    // onViewDetails 関数
    const handleViewDetails = (tweetId: number) => {
        navigate(`/tweet/${tweetId}`); // React Router を利用して詳細ページに遷移
    };

    useEffect(() => {
        const fetchTweets = async () => {
            const data = await getAllTweet();
            setTweets(data); // 状態に取得した投稿を保存
        };

        fetchTweets();
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const tweetData = await getTweetById(Number(id));
                const repliesData = await getReplies(Number(id));
                setTweet(tweetData);
                setReplies(repliesData || []); // null ガード
            } catch (error) {
                console.error("Failed to fetch tweet details:", error);
                setReplies([]); // エラー時も空配列
            }
        };

        fetchDetails();
    }, [id]);

    return (
        <Box
        sx={{
            display: 'flex',
            width: '80vw',
            overflow: 'hidden'
        }}>
            <Box
                sx={{
                    width: '40vw',
                    backgroundColor: colors.background, // Sidebar用の背景色（任意）
                    borderRight: '1px solid #ccc',
                }}
                >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="90vh"
                padding={0}
            >
            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                padding={0}
                sx={{width:'40vw'}}
            >
                {/* 投稿を TweetBox を利用して表示 */}
                {tweets.map((tweet) => (
                    <TweetBox
                        key={tweet.id}
                        tweet_id={tweet.id}
                        content={tweet.content}
                        author={tweet.user_name}
                        authorId={tweet.user_id}
                        date={new Date(tweet.created_at).toLocaleDateString()}
                        onViewDetails={() => handleViewDetails(tweet.id)}
                    />
                ))}
                    </Box>
                </Box>
            </Box>
            <Box 
                sx={{
                    width: '40vw',
                    backgroundColor: colors.background, // Sidebar用の背景色
                    borderRight: '1px solid #ccc',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90vh', // 全体の高さを明示
                    overflow: 'hidden', // 全体は隠す設定
                }}
            >
                {tweet && (
                    <Box marginBottom={4}>
                        <Typography p={1} sx={{color:colors.text}}>投稿詳細</Typography>
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
                <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <Typography p={1}>リプライ</Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto', // 縦スクロールを有効化
                            padding: 0,
                            maxHeight: '100%', // 高さを制限
                        }}
                    >
                        {(replies || []).map((reply) => (
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
