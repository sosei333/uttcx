import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ViewDetailsButton from '../molecules/ViewDetailsButton';
import ReplyButton from '../molecules/ReplyButton';
import LikeButton from '../molecules/LikeButton';
import BookmarkButton from '../molecules/BookmarkButton';
import PostReplyDialog from './PostReplyDialog';
import { addLike, removeLike } from '../../services/like';

interface PostProps {
    tweet_id: number;
    content: string;
    author: string;
    date: string;
    onViewDetails?: () => void;
}

const ReplyBox: React.FC<PostProps> = ({ tweet_id, content, author, date, onViewDetails }) => {
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
            <Box position="absolute" top={8} left={8}>
                <Typography variant="caption" color="textSecondary">
                    {author} ・ {date}
                </Typography>
            </Box>

            <Typography variant="body1" mt={2} mb={4}>
                {content}
            </Typography>

        </Box>
    );
};

export default ReplyBox;
