import React from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import ViewUserButton from '../atoms/ViewUserButton';

interface UserDetailsBoxProps {
    userName: string;
    userId: string;
    isFollowing?: boolean;
}

const SelfUserDetailsBox: React.FC<UserDetailsBoxProps> = ({ userName, userId, isFollowing }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            bgcolor="#f9f9f9"
            width="100%"
        >
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="textSecondary">
                User ID: {userId}
            </Typography>
            <Box display="flex" flexDirection="row" alignContent="center" gap={2} mt={1}>
            </Box>
        </Box>
    );
};

export default SelfUserDetailsBox;
