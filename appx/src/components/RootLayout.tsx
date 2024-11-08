import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar';

const RootLayout: React.FC = () => {
    const appBarHeight = 60; // AppBarの高さを任意の値に設定

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: `${appBarHeight}px`, // AppBar自体の高さを設定
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: `${appBarHeight}px`, // Toolbarの高さを設定
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" noWrap component="div">
                        Twitter
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar />
            <Box sx={{ display: 'flex', flexGrow: 1, mt: `${appBarHeight+200}px` }}>
                {/* 左側のメインコンテンツ */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 2,
                        ml: 5,
                        borderRight: '1px solid #ccc', // 境界線を追加（オプション）
                    }}
                >
                    <Outlet />
                </Box>
                {/* 右側の新しいBox */}
                <Box
                    sx={{
                        flexGrow: 2,
                        backgroundColor: '#f5f5f5', // 背景色を設定
                        minWidth: '250px',           // 最小幅を設定
                    }}
                >
                    <Typography variant="h6">追加コンテンツ</Typography>
                    {/* ここに追加コンテンツを配置 */}
                </Box>
            </Box>
        </Box>
    );
};

export default RootLayout;
