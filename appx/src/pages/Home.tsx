import React, { useEffect, useState } from 'react';
import { getAllTweet } from '../services/tweet'; // getTweet をインポート
import TweetBox from '../components/organisms/TweetBox'; // PostBox コンポーネントをインポート
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
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
            justifyContent="center"
            height="80vh"
            width="60vh" // 親要素の幅いっぱいに広げる
            padding={2}
        >
            <Box
                display="flex"
                flexDirection="column"

                overflow="auto"
                padding={2}
               
            >
                {/* 投稿を TweetBox を利用して表示 */}
                {tweets.map((tweet) => (
                    <TweetBox
                        key={tweet.id}
                        tweet_id={tweet.id}
                        content={tweet.content}
                        author={tweet.user_name}
                        date={new Date(tweet.created_at).toLocaleDateString()}
                        onViewDetails={() => handleViewDetails(tweet.id)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Tweets;
