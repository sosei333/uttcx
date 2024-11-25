import React from 'react';
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface BookmarkButtonProps {
    onClick?: () => void; // 必要に応じてクリックイベントを追加
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ onClick }) => {
    return (
        <IconButton aria-label="bookmark" onClick={onClick}>
            <BookmarkBorderIcon />
        </IconButton>
    );
};

export default BookmarkButton;
