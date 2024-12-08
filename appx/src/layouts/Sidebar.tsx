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
import {useTheme} from '@mui/material';
import MiniProfileBox from '../components/organisms/miniProfileBox';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [chatDialogOpen, setChatDialogOpen] = useState(false);
    const theme = useTheme();

    // 背景カラーを定義（テーマに基づく）
    const sidebarBackgroundColor = theme.palette.background.default; // または直接 '#E6E5E4' 等を設定

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
                mt: 0,
                backgroundColor: sidebarBackgroundColor, // 背景カラーを統一
                [`& .MuiDrawer-paper`]: {
                    width: '20%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: sidebarBackgroundColor, // 背景カラーを統一
                },
            }}
        >
            <Box sx={{ backgroundColor: sidebarBackgroundColor }}>
                <List sx={{ mt: '10vh' }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => navigate(item.link)} sx={{p:1}}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{fontSize:'5'}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider/>
            <Box
                sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%', // 等間隔を確実にするための高さ指定
                    backgroundColor: sidebarBackgroundColor, // 背景カラーを統一
                }}
            >
                <Box  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%', // 等間隔を確実にするための高さ指定
                    backgroundColor: sidebarBackgroundColor, // 背景カラーを統一
                }}>
                <Fab
                    onClick={handleOpenPostDialog}
                    aria-label="add"
                    color="primary"
                    sx={{ alignSelf: 'center',mt:10, width:'6vw', height: '6vw'
                     }}
                >
                    <DrawOutlinedIcon fontSize='medium'/>
                </Fab>
                </Box>
                <PostDialog open={postDialogOpen} onClose={handleClosePostDialog} />
                <ChatDialog open={chatDialogOpen} onClose={handleCloseChatDialog} />
                <Box sx={{width:'100%', 
                    display: 'flex',
                    flexDirection: "colum", 
                    justifyContent: "center",
                    alignItems: "center"}}> 
                    <Box
                    sx={{
                        height: "100%", 
                        width: "18vw", 
                        display: "flex", // Flexbox を使用
                        flexDirection: "column", // 子要素を縦方向に配置
                        justifyContent: "center", // 上下中央寄せ
                        alignItems: "center", // 左右中央寄せ
                        pb: 3
                    }}
                    >
                    <MiniProfileBox />
                    <SignOutButton />
                    </Box>

                </Box>
                {/* <Box sx={{ alignSelf: 'center', pb: 3, width: '90%' }}> 
                    <SignOutButton />
                </Box> */}
            </Box>
        </Drawer>
    );
};

export default Sidebar;