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
import SignOutButton from './atoms/SignOutButton';
import PostDialog from './organisms/PostTweetDialog';
import Fab from '@mui/material/Fab';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [postDialogOpen, setPostDialogOpen] = useState(false);

    const handleOpenPostDialog = () => {
        setPostDialogOpen(true);
    };

    const handleClosePostDialog = () => {
        setPostDialogOpen(false);
    };

    // 投稿時の処理
    const handlePost = (content: string) => {
        console.log('Post content:', content);
        // ここでバックエンドに送信する処理を実装
        // 例: fetch でPOSTリクエストを送る
        handleClosePostDialog(); // 投稿後にダイアログを閉じる
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
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
                <SignOutButton />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
