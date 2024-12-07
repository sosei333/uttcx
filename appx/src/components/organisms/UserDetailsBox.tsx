import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import FollowButton from '../atoms/FollowButton';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { getFollowingUsers } from '../../services/follow'; // フォロー中ユーザーを取得する関数
import { getUserIntroductionByID } from '../../services/user'; // 自己紹介を取得する関数
import { getUserImageByID } from '../../services/image';

interface UserDetailsBoxProps {
    userName: string;
    userId: string;
    isInitialyFollowing?: boolean;
}

const UserDetailsBox: React.FC<UserDetailsBoxProps> = ({ userName, userId, isInitialyFollowing }) => {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false); // フォロー状態を管理
    const [introduction, setIntroduction] = useState<string | null>(null); // 自己紹介文を管理
    const [loading, setLoading] = useState<boolean>(true); // 全体のローディング状態を管理
    const [loadingIntroduction, setLoadingIntroduction] = useState<boolean>(true); // 自己紹介文のローディング状態を管理
    const [url, setUrl] = useState<string | null>(null); // 自己紹介文を管理

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
    }, [currentUserId, userId]);

    // 自己紹介文を取得
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await getUserImageByID(userId);
                setUrl(url || `${process.env.PUBLIC_URL}/logo.png`);
            } catch (error) {
                console.error("Failed to fetch user image:", error);
                setUrl(`${process.env.PUBLIC_URL}/logo.png`)
            }
        };

        fetchImage();
    }, [userId]);

    useEffect(() => {
        const fetchIntroduction = async () => {
            try {
                setLoadingIntroduction(true);
                const intro = await getUserIntroductionByID(userId);
                setIntroduction(intro || 'No introduction available');
            } catch (error) {
                console.error("Failed to fetch user introduction:", error);
                setIntroduction('Failed to load introduction');
            } finally {
                setLoadingIntroduction(false);
            }
        };

        fetchIntroduction();
    }, [userId]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            bgcolor="#f9f9f9"
            p={2}
            my={1}
            border="1px solid #ccc"
            borderRadius={2}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            width="100%"
        >
            <Box
            component="img"
            src={url || `${process.env.PUBLIC_URL}/logo.png`}
            sx={{
              width: '20%', // 横幅を親要素にフィット
              // 最大幅を指定
              height: "auto", // 高さを自動調整
              borderRadius: "50%", // 角丸にする
              boxShadow: 2, // 軽い影を追加
              alignSelf: "center"
            }}
            alt="Uploaded Preview"
          />
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="textSecondary">
                User ID: {userId}
            </Typography>
            {loadingIntroduction ? (
                <Typography variant="body2" color="textSecondary">
                    Loading introduction...
                </Typography>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    {introduction}
                </Typography>
            )}
            {/* 現在のユーザーIDと表示するユーザーIDが異なる場合のみフォローボタンを表示 */}
            {currentUserId && userId !== currentUserId && (
                <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={1}>
                    {!loading ? (
                        <FollowButton
                            userId={userId}
                            isInitiallyFollowing={isFollowing} // フォロー状態を渡す
                        />
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Checking follow status...
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default UserDetailsBox;
