import React from 'react';
import { Dialog, DialogContent, DialogActions, Button} from '@mui/material';
import TextField from '../atoms/TextField';
//import Button from '../atoms/Button';
import { sendToGemini } from '../../services/gemini';
import { colors } from '../../layouts/colors';

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
    if (response.summary) {
      // `summary` が文字列の場合
      if (typeof response.summary === "string") {
        setAnswer(response.summary); // そのまま表示
      } 
      // `summary` が配列の場合（念のためのチェック）
      else if (Array.isArray(response.summary)) {
        setAnswer(response.summary.join('\n')); // 改行で結合して表示
      }
    } else {
      setAnswer(response.log || "検索結果が見つかりませんでした。"); // エラーログを表示
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
        <Button onClick={onClose} sx={{color: colors.accent}}>
          キャンセル
        </Button>
        <Button onClick={handlePost} disabled={!keyWord} sx={{color: colors.accent}}>
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
