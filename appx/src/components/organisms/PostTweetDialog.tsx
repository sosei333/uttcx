import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import TextField from '../atoms/TextField';
//import Button from '../atoms/Button';
import { postToBackend } from '../../services/tweet';
import { sendPromptToGemini } from '../../services/gemini';
import { colors } from '../../layouts/colors';

interface PostDialogProps {
  open: boolean;
  onClose: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ open, onClose }) => {
  const [postText, setPostText] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState<string | null>(null); // AIの回答を管理
  const [loading, setLoading] = React.useState(false); // ローディング状態を管理

  const handlePost = () => {
    postToBackend(postText);
    setPostText('');
    setAiResponse(null); // 投稿時にはAIの回答をリセット
  };

  const handleChat = async () => {
    setLoading(true);
    setAiResponse(null); // 前回の回答をクリア

    const formattedPrompt = `以下の内容をSNSに投稿しようと思うのですが、不適切な内容はありますか？\n\n"${postText}"`;

    try {
      const response = await sendPromptToGemini(formattedPrompt);
      if (response && response.answer) {
        setAiResponse(response.answer); // AIの回答を状態に保存
      } else {
        setAiResponse('AIからの回答がありませんでした。');
      }
    } catch (error) {
      setAiResponse('エラーが発生しました。もう一度試してください。');
    } finally {
      setLoading(false);
    }
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
        {loading ? (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            AIの回答を取得中...
          </Typography>
        ) : aiResponse ? (
          <Typography variant="body1" sx={{ marginTop: 2, padding: 1, border: `1px solid ${colors.accent}`, borderRadius: 4 }}>
            {aiResponse}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: colors.accent }}>
          キャンセル
        </Button>
        <Button onClick={handleChat} disabled={!postText || loading} sx={{ color: colors.accent }}>
          AIに質問
        </Button>
        <Button onClick={handlePost} disabled={!postText} sx={{ color: colors.accent }}>
          投稿
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
