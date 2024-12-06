import React from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import ViewUserButton from '../atoms/ViewUserButton';
import { getUserIntroductionByID } from '../../services/user';
import { getLocalizedStrings } from '../../layouts/strings';
import { Height } from '@mui/icons-material';

interface UserBoxProps {
    userName: string;
    userId: string;
    isFollowing?: boolean;
}

const UserBox: React.FC<UserBoxProps> = ({ userName, userId, isFollowing }) => {
    const messages = getLocalizedStrings();

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
            my={1}
            border="1px solid #ccc"
            borderRadius={2}
            bgcolor="#f9f9f9"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            width="100%"
        >
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="textSecondary">
                {messages.user} ID: {userId}
            </Typography>
            <Box display="flex" flexDirection="row" gap={2} mt={1}>
            <FollowButton userId={userId} isInitiallyFollowing={isFollowing} ></FollowButton>
            <ViewUserButton userID={userId}></ViewUserButton>
            </Box>
        </Box>
    );
};

export default UserBox;
