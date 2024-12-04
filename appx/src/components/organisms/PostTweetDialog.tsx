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
  const [showPromptSelector, setShowPromptSelector] = React.useState(false); // 質問選択を表示するか
  const [selectedPrompt, setSelectedPrompt] = React.useState(0); // 選択された質問文のインデックス

  // ユーザーに表示する質問文とAIに送る質問文を分ける
  const prompts = [
    { userPrompt: '不適切な内容は？', aiPrompt: '以下の内容に不適切な表現が含まれている場合、指摘してください。' },
    { userPrompt: '英語に翻訳して！', aiPrompt: '以下の投稿内容を英語に翻訳してください。' },
    { userPrompt: '読みやすい？', aiPrompt: '以下の投稿内容が読みやすいかどうか、改善点を教えてください。' },
    { userPrompt: '面白い内容か？', aiPrompt: '以下の投稿が面白いと思われるかどうか評価してください。' },
  ];

  const handlePost = () => {
    postToBackend(postText);
    setPostText('');
    setAiResponse(null); // 投稿時にはAIの回答をリセット
    onClose();
  };

  const handleShowPromptSelector = () => {
    setShowPromptSelector(true);
  };

  const handleChat = async () => {
    setShowPromptSelector(false); // 質問選択を閉じる
    setLoading(true);
    setAiResponse(null); // 前回の回答をクリア

    // 選択された質問のAI向け文を使用
    const formattedPrompt = `${prompts[selectedPrompt].aiPrompt}\n\n"${postText}"`;

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
          <Typography variant="body1" sx={{ marginTop: 2, padding: 1, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 4 }}>
            {aiResponse}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.primary.main }}>
          キャンセル
        </Button>
        <Button
          onClick={handleShowPromptSelector}
          disabled={!postText || loading}
          sx={{ color: theme.palette.primary.main }}
        >
          AIに質問
        </Button>
        <Button onClick={handlePost} disabled={!postText} sx={{ color: theme.palette.primary.main }}>
          投稿
        </Button>
      </DialogActions>

      {/* 質問選択ダイアログ */}
      {showPromptSelector && (
        <Dialog open={showPromptSelector} onClose={() => setShowPromptSelector(false)} fullWidth maxWidth="xs">
          <DialogContent>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              質問を選択してください:
            </Typography>
            <Select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(Number(e.target.value))}
              fullWidth
            >
              {prompts.map((prompt, index) => (
                <MenuItem value={index} key={index}>
                  {prompt.userPrompt}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPromptSelector(false)} sx={{ color: theme.palette.primary.main }}>
              キャンセル
            </Button>
            <Button
              onClick={handleChat}
              disabled={loading}
              sx={{ color: theme.palette.primary.main }}
            >
              AIに質問する
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default PostDialog;
