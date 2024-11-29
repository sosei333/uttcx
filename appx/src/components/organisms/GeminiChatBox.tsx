import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import TextField from '../atoms/TextField';
import Button from '../atoms/Button';
import { sendToGemini } from '../../services/gemini';

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ open, onClose }) => {
  const [keyWord, setKeyWord] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const handlePost = async () => {
    const response = await sendToGemini(keyWord);

    // レスポンスの処理
    if (response.summary && response.summary.length > 0) {
      setAnswer(response.summary.join('\n')); // 検索結果を改行で結合
    } else if (response.summary && response.summary.length === 0) {
      setAnswer("検索結果が見つかりませんでした。"); // 結果が空の場合
    } else {
      setAnswer(response.log); // エラーログを表示
    }

    setKeyWord('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        <TextField
          label="検索ワード"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          multiline
          minRows={4}
        />
        <TextField
          label="検索結果"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          minRows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          キャンセル
        </Button>
        <Button onClick={handlePost} color="primary" disabled={!keyWord}>
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
