import React from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import ViewUserButton from '../atoms/ViewUserButton';

interface UserBoxProps {
    userName: string;
    userId: string;
    isFollowing?: boolean;
}

const UserBox: React.FC<UserBoxProps> = ({ userName, userId, isFollowing }) => {
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
                User ID: {userId}
            </Typography>
            <FollowButton userId={userId} isInitiallyFollowing={isFollowing}></FollowButton>
            <ViewUserButton userID={userId}></ViewUserButton>
        </Box>
    );
};

export default UserBox;