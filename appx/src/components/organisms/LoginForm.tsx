import React, { useState } from 'react';
import { TextField, Box, Typography, Alert, Paper } from '@mui/material';
import NavigationButton from '../atoms/NavigationButton';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error: string | null;
  success: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error, success }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      console.error("メールアドレスまたはパスワードが入力されていません。");
      return;
    }

    try {
      await onLogin(email, password);
    } catch (error) {
      console.error("ログイン処理でエラーが発生しました:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={2} // 横の余白
    >
      {/* Paperでカードスタイルを追加 */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" mb={2}>ログイン</Typography>
        {/* 状態に応じたメッセージ表示 */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {/* {!error && success && <Alert severity="success">{success}</Alert>} */}
        <TextField
          label="メールアドレス"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="パスワード"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Box mt={3}>
          <NavigationButton label="ログイン" variant='contained' to="#" onClick={handleSubmit} />
        </Box>
      </Paper>

      {/* カードの外に配置されるナビゲーションボタン */}
      <Box mt={3} display="flex" flexDirection="column" alignItems="center">
        <NavigationButton label="新規登録" to="/signup" />
        <Box mt={2}>
          <NavigationButton label="トップページへ" to="/" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
