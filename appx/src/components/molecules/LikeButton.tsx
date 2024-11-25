import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LikeButtonProps {
    isLiked: boolean;
    onClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick }) => {
    return (
        <IconButton aria-label="like" onClick={onClick}>
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default LikeButton;
