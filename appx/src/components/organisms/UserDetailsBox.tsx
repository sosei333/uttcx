import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import {onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

interface UserDetailsBoxProps {
    userName: string;
    userId: string;
    isFollowing?: boolean;
}

const UserDetailsBox: React.FC<UserDetailsBoxProps> = ({ userName, userId, isFollowing }) => {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // Firebaseから現在のユーザー情報を取得
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserId(user.uid); // ユーザーIDを取得してstateに保存
            } else {
                setCurrentUserId(null); // ログアウト状態
            }
        });

        // クリーンアップ
        return () => unsubscribe();
    }, []);

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
            {/* 現在のユーザーIDと表示するユーザーIDが異なる場合のみフォローボタンを表示 */}
            {currentUserId && userId !== currentUserId && (
                <Box display="flex" flexDirection="row" alignContent="center" gap={2} mt={1}>
                    <FollowButton userId={userId} isInitiallyFollowing={isFollowing}></FollowButton>
                </Box>
            )}
        </Box>
    );
};

export default UserDetailsBox;
