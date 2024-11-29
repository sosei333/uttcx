import React from 'react';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import {colors} from '../../layouts/colors';

interface ReplyButtonProps {
    onClick: () => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
    return (
        <IconButton aria-label="post reply" onClick={onClick}>
            <ReplyIcon sx={{
                color:colors.accent
            }}/>
        </IconButton>
    );
};

export default ReplyButton;
