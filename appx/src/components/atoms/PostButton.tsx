import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

const PostButton: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [postText, setPostText] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = () => {
        console.log("Post content:", postText); // This will be replaced with backend functionality later
        setPostText(''); // Clear the input after posting
        handleClose();
    };

    return (
        <>
            <Button variant="contained" color="success" endIcon={<DrawOutlinedIcon />} size="large" fullWidth sx={{ my: 2 }} onClick={handleClickOpen}>
                投稿
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>新しい投稿</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="投稿内容"
                        type="text"
                        fullWidth
                        multiline
                        minRows={4}
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        キャンセル
                    </Button>
                    <Button onClick={handlePost} color="primary" variant="contained">
                        投稿
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PostButton;
