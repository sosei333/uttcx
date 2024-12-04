import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, MenuItem, Select, useTheme } from '@mui/material';
import TextField from '../atoms/TextField';
import { postToBackend } from '../../services/tweet';
import { sendPromptToGemini } from '../../services/gemini';

interface PostDialogProps {
  open: boolean;
  onClose: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ({ open, onClose }) => {
  const theme = useTheme();

  const [postText, setPostText] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState<string | null>(null); // AIの回答を管理
  const [loading, setLoading] = React.useState(false); // ローディング状態を管理
  const [selectedPrompt, setSelectedPrompt] = React.useState(0); // 選択された質問文のインデックス

  // 簡潔な質問文リスト
  const prompts = [
    '不適切な内容は？',
    '英語に翻訳してください',
    '読みやすい？',
    '面白い内容か？',
  ];

  const handlePost = () => {
    postToBackend(postText);
    setPostText('');
    setAiResponse(null); // 投稿時にはAIの回答をリセット
    onClose();
  };

  const handleChat = async () => {
    setLoading(true);
    setAiResponse(null); // 前回の回答をクリア

    const formattedPrompt = `以下の内容について、${prompts[selectedPrompt]} 300字以内で回答してください。\n\n"${postText}"`;

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
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          質問を選択:
        </Typography>
        <Select
          value={selectedPrompt}
          onChange={(e) => setSelectedPrompt(Number(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          {prompts.map((prompt, index) => (
            <MenuItem value={index} key={index}>
              {prompt}
            </MenuItem>
          ))}
        </Select>
        {loading ? (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            AIの回答を取得中...
          </Typography>
        ) : aiResponse ? (
          <Typography variant="body1" sx={{ marginTop: 2, padding: 1, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 4 }}>
            {aiResponse}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.primary.main }}>
          キャンセル
        </Button>
        <Button onClick={handleChat} disabled={!postText || loading} sx={{ color: theme.palette.primary.main }}>
          AIに質問
        </Button>
        <Button onClick={handlePost} disabled={!postText} sx={{ color: theme.palette.primary.main }}>
          投稿
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
