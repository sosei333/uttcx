import React, { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const drawerWidth = 240;

interface RootLayoutProps {
    children?: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = () => {
    const menuItems = [
        { text: 'Home', link:'./home', icon: <HomeIcon /> },
        { text: 'Explore',link:'./explore', icon: <SearchIcon /> },
        { text: 'Communities', link:'./explore',icon: <GroupIcon /> },
        { text: 'Settings',link:'./explore', icon: <SettingsIcon /> },
        { text: 'Profile',link:'./explore', icon: <PersonIcon /> },
    ];
    const navigate=useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            alert("ログアウトしました");
            navigate('/');
        }).catch(error => {
            alert("ログアウトに失敗しました: " + error.message);
        });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Clipped drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={()=>navigate(item.link)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Button variant="contained" onClick={handleSignOut} color="secondary" fullWidth>
                            ログアウト
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <Box sx={{ overflow: 'auto' }}>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {/* Outletを使用してネストされたルートを描画 */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default RootLayout;
