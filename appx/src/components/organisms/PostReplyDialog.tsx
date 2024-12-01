import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, useTheme } from '@mui/material';
import TextField from '../atoms/TextField';
//import Button from '../atoms/Button';
import { postReply } from '../../services/reply';
//import {colors} from '../../layouts/colors';

interface PostDialogProps {
  open: boolean;
  parent_id: number;
  onClose: () => void;
}

const PostReplyDialog: React.FC<PostDialogProps> = ({ open, parent_id, onClose }) => {
  const theme=useTheme();
  
  const [postText, setPostText] = React.useState('');

  const handlePost = () => {
    postReply(parent_id, postText);
    setPostText('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <TextField
          label="投稿内容"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          multiline
          minRows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:theme.palette.primary.main}}>
          キャンセル
        </Button>
        <Button onClick={handlePost}  disabled={!postText} sx={{color:theme.palette.primary.main}}>
          リプライを投稿
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostReplyDialog;
