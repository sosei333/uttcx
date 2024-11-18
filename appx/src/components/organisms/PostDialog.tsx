import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import TextField from '../atoms/TextField';
import Button from '../atoms/Button';
import { postToBackend } from '../../services/tweet';

interface PostDialogProps {
  open: boolean;
  onClose: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ open, onClose }) => {
  const [postText, setPostText] = React.useState('');

  const handlePost = () => {
    postToBackend(postText);
    setPostText('');
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
        <Button onClick={onClose} color="secondary">
          キャンセル
        </Button>
        <Button onClick={handlePost} color="primary" disabled={!postText}>
          投稿
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
