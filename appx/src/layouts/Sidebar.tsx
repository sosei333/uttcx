import React, { useState } from 'react';
import {
    Toolbar,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../constants/MenuItems';
import SignOutButton from '../components/atoms/SignOutButton';
import PostDialog from '../components/organisms/PostTweetDialog';
import Fab from '@mui/material/Fab';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import ChatDialog from '../components/organisms/GeminiChatBox';


const drawerWidth = 240;

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false);

    const handleOpenPostDialog = () => {
        setPostDialogOpen(true);
    };

    const handleClosePostDialog = () => {
        setPostDialogOpen(false);
    };

    const handleOpenChatDialog = () => {
        setChatDialogOpen(true);
    };

    const handleCloseChatDialog = () => {
        setChatDialogOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                [`& .MuiDrawer-paper`]: {
                    width: '25%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                },
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
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 投稿ボタン */}
                <Fab
                    onClick={handleOpenPostDialog}
                    color="success"
                    aria-label="add"
                    size="large"
                    sx={{ alignSelf: 'center' }}
                >
                    <DrawOutlinedIcon />
                </Fab>
                {/* 投稿ダイアログ */}
                <PostDialog
                    open={postDialogOpen}
                    onClose={handleClosePostDialog}
                />

                {/*gemini*/}
                 <Fab
                    onClick={handleOpenChatDialog}
                    color="error"
                    aria-label="add"
                    size="large"
                    sx={{ alignSelf: 'center' }}
                >
                    <DrawOutlinedIcon />
                </Fab>
                {/* 投稿ダイアログ */}
                <ChatDialog
                    open={chatDialogOpen}
                    onClose={handleCloseChatDialog}
                />
                <SignOutButton />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
