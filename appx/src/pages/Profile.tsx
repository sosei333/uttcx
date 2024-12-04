import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import ProfileBox from '../components/organisms/ProfileBox';

const Profile: React.FC = () => {
    const theme = useTheme(); // テーマを取得

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default, // テーマの背景色を使用
                minHeight: '80vh', // 画面全体を覆う
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ProfileBox />
        </Box>
    );
};

export default Profile;
