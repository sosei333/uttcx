import React, { useState } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PostReplyDialog from './PostReplyDialog'; // ダイアログをインポート
import { addLike, removeLike } from '../../services/like';

interface PostProps {
    tweet_id: number;
    content: string;
    author: string;
    date: string;
    onViewDetails?: () => void; // 詳細を表示するためのコールバック関数
}

const TweetBox: React.FC<PostProps> = ({ tweet_id, content, author, date, onViewDetails }) => {
    const [isLiked, setLiked] = useState(false); // いいね状態を管理
    const [isReplyDialogOpen, setReplyDialogOpen] = useState(false);

    const handleLikeClick = async () => {
        try {
            if (isLiked) {
                await removeLike(tweet_id); // ユーザーIDは適切に設定
                setLiked(false);
            } else {
                await addLike(tweet_id); // ユーザーIDは適切に設定
                setLiked(true);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handleReplyClick = () => {
        setReplyDialogOpen(true);
    };

    const handleReplyDialogClose = () => {
        setReplyDialogOpen(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
            my={1}
            border="1px solid #ccc"
            borderRadius={2}
            width="100%"
            position="relative"
            bgcolor="#f9f9f9"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
            {/* 投稿者と投稿日を右上に表示 */}
            <Box position="absolute" top={8} left={8}>
                <Typography variant="caption" color="textSecondary">
                    {author} ・ {date}
                </Typography>
            </Box>

            {/* コンテンツ */}
            <Typography variant="body1" mt={2} mb={4}>
                {content}
            </Typography>

            {/* いいねとブックマークボタンを右下に配置 */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                <Box display="flex" gap={1}>
                    {/* 詳細を表示ボタン */}
                    {onViewDetails && (
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={onViewDetails}
                        >
                            詳細を表示
                        </Button>
                    )}
                    {/* リプライを投稿するボタン */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleReplyClick}
                    >
                        リプライを投稿
                    </Button>
                </Box>
                {/* アクションボタン（いいね、ブックマーク） */}
                <Box>
                    <IconButton aria-label="like" onClick={handleLikeClick}>
                        {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton aria-label="bookmark">
                        <BookmarkBorderIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* リプライ用ダイアログ */}
            <PostReplyDialog 
            parent_id={tweet_id} open={isReplyDialogOpen} onClose={handleReplyDialogClose} />
        </Box>
    );
};

export default TweetBox;
