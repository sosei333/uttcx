import React, { useEffect, useState } from 'react';
import { getFollowingUsers } from '../services/follow'; // フォロー取得関数をインポート
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

type FollowingUser = {
    ID: string;
    UserName: string;
};

const FollowingList: React.FC = () => {
    const [followingUsers, setFollowingUsers] = useState<FollowingUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // データを取得する関数
    const fetchFollowingUsers = async () => {
        setLoading(true); // ローディング状態を開始
        setError(null); // エラーをリセット

        try {
            const data = await getFollowingUsers(); // フォローユーザーを取得
            setFollowingUsers(data || []); // null の場合に空配列を代入
        } catch (err) {
            setError("Failed to fetch following users. Please try again later.");
            console.error("Error fetching following users:", err);
        } finally {
            setLoading(false); // ローディング状態を終了
        }
    };

    // 初期データ取得
    useEffect(() => {
        fetchFollowingUsers();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            width="60vh"
            padding={2}
        >
            <Typography variant="h4" gutterBottom>
                Following Users
            </Typography>

            {/* 更新ボタン */}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={fetchFollowingUsers} 
                disabled={loading}
                sx={{ mb: 2 }}
            >
                {loading ? "Loading..." : "Refresh"}
            </Button>

            <Box
                display="flex"
                flexDirection="column"
                overflow="auto"
                padding={2}
            >
                {/* エラー表示 */}
                {error ? (
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                ) : followingUsers.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        You are not following anyone yet.
                    </Typography>
                ) : (
                    <List>
                        {followingUsers.map((user) => (
                            <ListItem key={user.ID}>
                                <ListItemText
                                    primary={user.UserName}
                                    secondary={`User ID: ${user.UserName}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default FollowingList;
