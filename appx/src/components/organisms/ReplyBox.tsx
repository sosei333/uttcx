import React, { useState } from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';
import { addLike, removeLike } from '../../services/like';
import { useNavigate } from 'react-router-dom';

interface PostProps {
    tweet_id: number;
    content: string;
    author: string;
    authorId: string; // 作者のユーザーIDを追加
    date: string;
    onViewDetails?: () => void;
}

const ReplyBox: React.FC<PostProps> = ({ tweet_id, content, author, authorId, date, onViewDetails }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isLiked, setLiked] = useState(false);
    const [isReplyDialogOpen, setReplyDialogOpen] = useState(false);

    const handleLikeClick = async () => {
        try {
            if (isLiked) {
                await removeLike(tweet_id);
                setLiked(false);
            } else {
                await addLike(tweet_id);
                setLiked(true);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handleAuthorClick = () => {
        navigate(`/user/${authorId}`); // ユーザーページへの遷移
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
            my={1}
            mx="auto"
            border="1px solid #ccc"
            borderRadius={2}
            position="relative"
            bgcolor="#f9f9f9"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            sx={{
                width: '90%',
                borderColor: theme.palette.primary.main,
                borderWidth: '1.5pt',
            }}
        >
            {/* ユーザー名をクリック可能にする */}
            <Box display="flex" alignItems="center" mb={2}>
                <Link
                    component="button"
                    variant="caption"
                    color="textSecondary"
                    onClick={handleAuthorClick} // ユーザー名クリック時のハンドラー
                    sx={{
                        textDecoration: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {author}
                </Link>
                <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                    ・ {date}
                </Typography>
            </Box>

            {/* コンテンツ表示 */}
            <Typography variant="body1" mt={2} mb={4}>
                {content}
            </Typography>
        </Box>
    );
};

export default ReplyBox;
