import React, { useEffect, useState } from 'react';
import { getFollowingUsers, getFollowedUsers } from '../services/follow'; // フォロー取得関数をインポート
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import UserBox from '../components/organisms/UserBox'; // UserBox をインポート

type FollowingUser = {
    ID: string;
    UserName: string;
};

const FollowingList: React.FC = () => {
    const [users, setUsers] = useState<FollowingUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'following' | 'followed'>('following'); // 表示モードを管理

    // ユーザーリストを取得する関数
    const fetchUsers = async (mode: 'following' | 'followed') => {
        setLoading(true);
        setError(null);

        try {
            const data =
                mode === 'following' ? await getFollowingUsers() : await getFollowedUsers();
            setUsers(data || []);
        } catch (err) {
            setError(`Failed to fetch ${mode === 'following' ? 'following' : 'followed'} users.`);
            console.error(`Error fetching ${mode} users:`, err);
        } finally {
            setLoading(false);
        }
    };

    // 表示モードが切り替わるたびにデータを取得
    useEffect(() => {
        fetchUsers(viewMode);
    }, [viewMode]);

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
                {viewMode === 'following' ? 'Following Users' : 'Followed By Users'}
            </Typography>

            {/* 表示切り替えボタン */}
            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, newMode) => {
                    if (newMode) setViewMode(newMode); // ボタンを切り替える
                }}
                sx={{ mb: 2 }}
            >
                <ToggleButton value="following">Following</ToggleButton>
                <ToggleButton value="followed">Followed By</ToggleButton>
            </ToggleButtonGroup>

            {/* 更新ボタン */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => fetchUsers(viewMode)}
                disabled={loading}
                sx={{ mb: 2 }}
            >
                {loading ? 'Loading...' : 'Refresh'}
            </Button>

            <Box display="flex" flexDirection="column" width="100%" padding={2}>
                {error ? (
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                ) : users.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        {viewMode === 'following'
                            ? 'You are not following anyone yet.'
                            : 'No one is following you yet.'}
                    </Typography>
                ) : (
                    users.map((user) => (
                        <UserBox key={user.ID} userName={user.UserName} userId={user.ID} />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default FollowingList;
