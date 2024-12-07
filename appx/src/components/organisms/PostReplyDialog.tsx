import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, MenuItem, Select, useTheme } from '@mui/material';
import TextField from '../atoms/TextField';
import { postReply } from '../../services/reply';
import { sendPromptToGemini } from '../../services/gemini';
import { getLocalizedStrings } from '../../layouts/strings';


interface PostDialogProps {
  open: boolean;
  parent_id: number;
  onClose: () => void;
}

const PostReplyDialog: React.FC<PostDialogProps> = ({ open, parent_id, onClose }) => {
  const theme = useTheme();
  const messages = getLocalizedStrings();
  const [postText, setPostText] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showPromptSelector, setShowPromptSelector] = React.useState(false);
  const [selectedPrompt, setSelectedPrompt] = React.useState(0);

  // ユーザーに表示する質問文とAIに送る質問文を分ける
  const prompts = [
    { userPrompt: messages.aiQuestion1, aiPrompt: messages.aiPrompt1 },
    { userPrompt: messages.aiQuestion2, aiPrompt: messages.aiPrompt2 },
    { userPrompt: messages.aiQuestion3, aiPrompt: messages.aiPrompt3 },
    { userPrompt: messages.aiQuestion4, aiPrompt: messages.aiPrompt4 },
  ];

  const handlePost = () => {
    postReply(parent_id, postText);
    setPostText('');
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
          label={messages.content}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          multiline
          minRows={4}
        />
        {loading ? (
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            {messages.receivingAnswer}
          </Typography>
        ) : aiResponse ? (
          <Typography variant="body1" sx={{ marginTop: 2, padding: 1, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 4 }}>
            {aiResponse}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.primary.main }}>
          {messages.cancel}
        </Button>
        <Button
          onClick={handleShowPromptSelector}
          disabled={!postText || loading}
          sx={{ color: theme.palette.primary.main }}
        >
          {messages.question}
        </Button>
        <Button onClick={handlePost} disabled={!postText} sx={{ color: theme.palette.primary.main }}>
          {messages.post}
        </Button>
      </DialogActions>

      {/* 質問選択ダイアログ */}
      {showPromptSelector && (
        <Dialog open={showPromptSelector} onClose={() => setShowPromptSelector(false)} fullWidth maxWidth="xs">
          <DialogContent>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {messages.selectQuestion}:
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
              {messages.cancel}
            </Button>
            <Button
              onClick={handleChat}
              disabled={loading}
              sx={{ color: theme.palette.primary.main }}
            >
              {messages.question}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default PostReplyDialog;
