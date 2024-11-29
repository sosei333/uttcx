import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import colors from './colors';

const RootLayout: React.FC = () => {

    return (
        <Box sx={{ display: 'flex', height: '100vh', width:'100vw' }}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    width: '100vw', // 全体の幅を100%に設定
                    height: '10vh'
                }}
            >
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        height: `10vh`, // AppBar自体の高さを設定
                        backgroundColor: colors.primary,
                    }}
                >
                    <Toolbar
                        sx={{
                            minHeight: `10vh`, // Toolbarの高さを設定
                            display: 'flex',
                            alignItems: 'center',
                            //backgroundColor: colors.primary, // AppBarの背景色
                        }}
                    >
                        <Typography variant="h6" noWrap component="div">
                            Twitter
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    //mt: `${appBarHeight}px`, // AppBarの高さ分の余白を確保
                    width: '100vw', // 全体の幅を100%に設定
                    height: '90vh',
                    mt:'10vh',
                }}
            >
                {/* Sidebar を Box として扱う */}
                <Box
                    sx={{
                        width: '15vw',
                        backgroundColor: colors.background, // Sidebar用の背景色（任意）
                        borderRight: '1px solid #ccc',
                    }}
                >
                    <Sidebar />
                </Box>

                {/* 真ん中のメインコンテンツ */}
                <Box
                    component="main"
                    sx={{
                        width:'65vw', // 残りのスペースを占有
                        display: 'flex',
                        justifyContent: 'center', // コンテンツを右寄せ
                        alignItems: 'flex-start', // 縦方向は上揃え
                        backgroundColor: colors.background, // メインコンテンツの背景色
                        padding: '16px', // 任意の余白
                    }}
                >
                    <Outlet />
                </Box>
                <Box
                    component="main"
                    sx={{
                        width:'20vw', // 残りのスペースを占有
                        display: 'flex',
                        justifyContent: 'flex-end', // コンテンツを右寄せ
                        alignItems: 'flex-start', // 縦方向は上揃え
                        backgroundColor: colors.primary, // メインコンテンツの背景色
                        padding: '16px', // 任意の余白
                    }}
                >
                    別のコンテンツ（リプライとか表示してもいいね）
                </Box>
            </Box>
        </Box>
    );
};

export default RootLayout;
