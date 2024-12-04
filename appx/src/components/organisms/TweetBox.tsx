import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ViewDetailsButton from '../molecules/ViewDetailsButton';
import ReplyButton from '../molecules/ReplyButton';
import LikeButton from '../molecules/LikeButton';
import BookmarkButton from '../molecules/BookmarkButton';
import FollowButton from '../atoms/FollowButton';
import PostReplyDialog from './PostReplyDialog';
import { addLike, removeLike } from '../../services/like';
import { addFollow, removeFollow } from '../../services/follow';
import { Link } from '@mui/material'; // MUIのLinkコンポーネントを使用
import { useNavigate } from 'react-router-dom';

interface PostProps {
    tweet_id: number;
    content: string;
    author: string;
    date: string;
    likeCount?: number;
    authorId: string; // 作者のユーザーIDを追加
    isFollowingAuthor?: boolean; // フォロー状態を初期化
    onViewDetails?: () => void;
    showFollowButton?: boolean;
    isInitialyLiked?: boolean;
    onAuthorClick?: (authorId: string) => void; // ユーザー名クリック時のコールバック
}

const TweetBox: React.FC<PostProps> = ({
    tweet_id,
    content,
    author,
    date,
    likeCount,
    authorId,
    isFollowingAuthor = false,
    onViewDetails,
    showFollowButton = true,
    isInitialyLiked,
    onAuthorClick,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isLiked, setLiked] = useState(isInitialyLiked || false);
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

    const handleReplyClick = () => {
        setReplyDialogOpen(true);
    };

    const handleReplyDialogClose = () => {
        setReplyDialogOpen(false);
    };

    const handleAuthorClick = () => {
        navigate(`/user/${authorId}`); // /user/${authorId} に遷移
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
            <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                {/* ユーザー名をクリック可能にする */}
                <Link
                    component="button"
                    variant="caption"
                    color="textSecondary"
                    onClick={handleAuthorClick} // コールバックでユーザーIDを渡す
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
                <Box flexGrow={1} />
                {showFollowButton && (
                    <Box>
                        <FollowButton userId={authorId} isInitiallyFollowing={isFollowingAuthor} />
                    </Box>
                )}
            </Box>

            <Typography variant="body1" mt={2} mb={4}>
                {content}
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                <Box display="flex" gap={1}>
                    {onViewDetails && <ViewDetailsButton onClick={onViewDetails} />}
                    <ReplyButton onClick={handleReplyClick} />
                </Box>
                <Box>
                    <LikeButton isLiked={isLiked} onClick={handleLikeClick} />
                    {likeCount}
                    <BookmarkButton />
                </Box>
            </Box>

            <PostReplyDialog
                parent_id={tweet_id}
                open={isReplyDialogOpen}
                onClose={handleReplyDialogClose}
            />
        </Box>
    );
};

export default TweetBox;
