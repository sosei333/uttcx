import React, { useEffect, useState } from 'react';
import { getAllTweet } from '../services/tweet'; // getTweet をインポート
import PostBox from '../components/organisms/PostBox'; // PostBox コンポーネントをインポート
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
};

const Tweets: React.FC = () => {
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

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            height="100vh"
            width="60vw"
            padding={2}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                height="100%"
                width="100%"
                overflow="auto"
                padding={2}
            >
                {/* 投稿を PostBox を利用して表示 */}
                {tweets.map((tweet) => (
                    <PostBox
                        key={tweet.id}
                        content={tweet.content}
                        author={tweet.user_id}
                        date={new Date(tweet.created_at).toLocaleDateString()}
                        onViewDetails={() => handleViewDetails(tweet.id)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Tweets;