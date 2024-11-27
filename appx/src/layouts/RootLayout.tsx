import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import colors from './colors';

const RootLayout: React.FC = () => {
    const appBarHeight = 60; // AppBarの高さを任意の値に設定

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
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
                        backgroundColor: colors.secondary, // AppBarの背景色
                    }}
                >
                    <Typography variant="h6" noWrap component="div">
                        Twitter
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    mt: `${appBarHeight}px`, // AppBarの高さ分の余白を確保
                    width: '100%', // 全体の幅を100%に設定
                }}
            >
                {/* Sidebar を Box として扱う */}
                <Box>
                    <Sidebar />
                </Box>

                {/* 真ん中のメインコンテンツ */}
                <Box
                    component="main"
                    sx={{
                        //flex: '0 0 60%', // 幅を60%に固定
                        flexShrink: 0, // 内容に応じて幅が縮小されるのを防ぐ
                        minWidth: 0, // 必要以上に広がるのを防ぐ
                        backgroundColor: colors.background, // メインコンテンツの背景色
                        padding: '0px',
                        borderRight: '1px solid #ccc',
                        width:'100vh'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default RootLayout;
