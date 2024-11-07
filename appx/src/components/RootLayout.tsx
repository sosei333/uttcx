import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Button, Divider } from '@mui/material';
import Sidebar from './Sidebar';
import useSignOut from '../hooks/useSignOut';

const RootLayout: React.FC = () => {
    const handleSignOut = useSignOut();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Twitter
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default RootLayout;
