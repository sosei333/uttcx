import React from 'react';
import { Toolbar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../constants/MenuItems';
import SignOutButton from './atoms/SignOutButton';
import PostButton from './atoms/PostButton';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
            }}
        >
            <Box>
                <Toolbar /> {/* AppBarの高さ分の余白を作る */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => navigate(item.link)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
            <Box sx={{ p: 2 }}>
                <PostButton />
                <SignOutButton />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
