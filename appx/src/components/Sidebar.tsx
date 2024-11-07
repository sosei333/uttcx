import React from 'react';
import { Toolbar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../constants/MenuItems';
import useSignOut from '../hooks/useSignOut';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const handleSignOut = useSignOut();

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
                <Divider/>
            </Box>
            <Box sx={{ p: 2 }}>
                <Button variant="contained" onClick={handleSignOut} color="secondary" fullWidth>
                    ログアウト
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
