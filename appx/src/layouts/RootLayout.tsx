import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography,useTheme } from '@mui/material';
import Sidebar from './Sidebar';
//import {colors} from './colors';

const RootLayout: React.FC = () => {
    const theme=useTheme();

    return (
        <Box sx={{ display: 'flex',mt:0, height: '100vh', width:'100vw' }}>
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
                    //position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        height: '10vh', // AppBar自体の高さを設定
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    <Toolbar
                        sx={{
                            minHeight: '10vh', // Toolbarの高さを設定
                            display: 'flex',
                            alignItems: 'center',
                            //backgroundColor: colors.primary, // AppBarの背景色
                        }}
                    >
                        <Box mt={1}>
                            <img
                            src={`${process.env.PUBLIC_URL}/logo.png`} // `public` フォルダにあるロゴ画像
                            alt="Logo"
                            style={{ width: '7vh', height: '7vh' }} // ロゴのサイズを調整
                            />
                        </Box>
                        <Typography mx={2} variant="h6" noWrap component="div">
                            Twitter
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            
            <Box
                sx={{
                    width: '100vw', // 全体の幅を100%に設定
                    height: '90vh',
                    mt:'10vh',
                    
                }}
            >
                {/* Sidebar を Box として扱う */}
                <Box
                    sx={{
                        width: '20vw',
                        backgroundColor: theme.palette.background.default, // Sidebar用の背景色（任意）
                        borderRight: '1px solid #ccc',
                    }}
                >
                    <Sidebar />
                </Box>

                {/* 真ん中のメインコンテンツ */}
                <Box
                    component="main"
                    sx={{
                        width:'80vw', // 残りのスペースを占有
                        display: 'flex',
                        justifyContent: 'center', // コンテンツを右寄せ
                        alignItems: 'flex-start', // 縦方向は上揃え
                        backgroundColor: theme.palette.background.default, // メインコンテンツの背景色
                        padding: 0, // 任意の余白
                        height: '90vh',
                        boxSizing: 'border-box',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default RootLayout;