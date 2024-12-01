import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

interface ReplyButtonProps {
    onClick: () => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
    const theme=useTheme();
    return (
        <IconButton aria-label="post reply" onClick={onClick}>
            <ReplyIcon sx={{
                color:theme.palette.primary.main
            }}/>
        </IconButton>
    );
};

export default ReplyButton;
