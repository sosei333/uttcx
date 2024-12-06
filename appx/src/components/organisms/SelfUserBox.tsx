import React from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import ViewUserButton from '../atoms/ViewUserButton';
import { getLocalizedStrings } from '../../layouts/strings';

interface UserDetailsBoxProps {
    userName: string;
    userId: string;
    isFollowing?: boolean;
}

const SelfUserDetailsBox: React.FC<UserDetailsBoxProps> = ({ userName, userId, isFollowing }) => {
    const messages= getLocalizedStrings()

    return (
        <Box
            display="flex"
            flexDirection="column"
            bgcolor="#f9f9f9"
            width="100%"
        >
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="textSecondary">
                {messages.user} ID: {userId}
            </Typography>
            <Box display="flex" flexDirection="row" alignContent="center" gap={2} mt={1}>
            </Box>
        </Box>
    );
};

export default SelfUserDetailsBox;
