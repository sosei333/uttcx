import React from 'react';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

interface ReplyButtonProps {
    onClick: () => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
    return (
        <IconButton aria-label="post reply" onClick={onClick}>
            <ReplyIcon color="secondary" />
        </IconButton>
    );
};

export default ReplyButton;
