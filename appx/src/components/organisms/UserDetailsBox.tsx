import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { getFollowingUsers } from '../../services/follow'; // フォロー中ユーザーを取得する関数

interface UserDetailsBoxProps {
    userName: string;
    userId: string;
    isInitialyFollowing?:boolean;
}

const UserDetailsBox: React.FC<UserDetailsBoxProps> = ({ userName, userId, isInitialyFollowing }) => {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false); // フォロー状態を管理
    const [loading, setLoading] = useState<boolean>(true); // ローディング状態を管理

    // Firebaseから現在のユーザー情報を取得
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserId(user.uid); // ユーザーIDを取得してstateに保存
            } else {
                setCurrentUserId(null); // ログアウト状態
            }
        });

        return () => unsubscribe();
    }, []);

    // フォロー状態を取得して判定
    useEffect(() => {
        const checkIfFollowing = async () => {
            if (!currentUserId) {
                setIsFollowing(false); // ログインしていない場合はフォロー状態をfalse
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const followingUsers = await getFollowingUsers();
                const isFollowingUser = followingUsers.some((user) => user.ID === userId);
                setIsFollowing(isFollowingUser); // フォロー状態を更新
            } catch (error) {
                console.error("Failed to fetch following users:", error);
            } finally {
                setLoading(false);
            }
        };

        checkIfFollowing();
    }, [currentUserId, userId]); // currentUserIdまたはuserIdが変更されたときに再実行

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
                    {!loading ? (
                        <FollowButton
                            userId={userId}
                            isInitiallyFollowing={isFollowing} // フォロー状態を渡す
                        />
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Loading...
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default UserDetailsBox;
