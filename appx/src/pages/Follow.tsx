import React, { useEffect, useState } from 'react';
import { getFollowingUsers, getFollowedUsers } from '../services/follow';
import { Box, Typography, IconButton, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import UserBox from '../components/organisms/UserBox';

type FollowingUser = {
    ID: string;
    UserName: string;
};

const FollowingList: React.FC = () => {
    const [users, setUsers] = useState<FollowingUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'following' | 'followed'>('following');
    const [followingUserIds, setFollowingUserIds] = useState<Set<string>>(new Set()); // フォローされているユーザーIDを保存

    // フォローされているユーザーリストを取得
    const fetchFollowedUserIds = async () => {
        try {
            const followingUsers = await getFollowingUsers();
            setFollowingUserIds(new Set(followingUsers.map((user) => user.ID)));
        } catch (err) {
            console.error('Failed to fetch followed users:', err);
        }
    };

    // 表示モードに基づくユーザーリストを取得
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

    // 初期データの取得とモード変更時のデータ取得
    useEffect(() => {
        fetchFollowedUserIds(); // フォローされているユーザーリストを取得
        fetchUsers(viewMode); // 表示モードに応じたユーザーリストを取得
    }, [viewMode]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="90vh"
            width="70vh"
            padding={2}
        >
            {/* ヘッダー部分 */}
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ height: '10vh', width: '100%' }}
            >
                <Typography variant="h4" gutterBottom>
                    {viewMode === 'following' ? 'Following Users' : 'Followed By Users'}
                </Typography>
                <IconButton
                    onClick={() => fetchUsers(viewMode)}
                    disabled={loading}
                    sx={{
                        border: '1px solid',
                        borderColor: loading ? 'grey.300' : 'primary.main',
                    }}
                >
                    <RefreshIcon color={loading ? 'disabled' : 'primary'} />
                </IconButton>
            </Box>

            {/* トグルボタン */}
            <Box
                display="flex"
                flexDirection="column"
                sx={{ width: '100%', alignItems: 'center', marginBottom: 1 }}
            >
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, newMode) => {
                        if (newMode) setViewMode(newMode);
                    }}
                    sx={{
                        width: '100%',
                        marginBottom: 2,
                        display: 'flex',
                    }}
                >
                    <ToggleButton value="following" sx={{ flex: 1 }}>
                        Following
                    </ToggleButton>
                    <ToggleButton value="followed" sx={{ flex: 1 }}>
                        Followed By
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* スクロール可能なエリア */}
            <Paper
                elevation={3}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    width: '100%',
                    padding: 2,
                    maxHeight: '65vh',
                }}
            >
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
                        <UserBox
                            key={user.ID}
                            userName={user.UserName}
                            userId={user.ID}
                            isFollowing={followingUserIds.has(user.ID)} // フォロー状態を反映
                        />
                    ))
                )}
            </Paper>
        </Box>
    );
};

export default FollowingList;
