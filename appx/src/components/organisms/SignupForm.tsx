import React, { useState } from 'react';
import { TextField, Box, Typography, Alert, Paper } from '@mui/material';
import NavigationButton from '../atoms/NavigationButton'; // 汎用コンポーネントをインポート

interface SignupFormProps {
  onSignup: (email: string, name: string, password: string, confirmPassword: string) => void;
  error: string | null;
  success: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, error, success }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    onSignup(email, name, password, confirmPassword);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Paper
        elevation={3} // 影の強さ
        sx={{
          padding: 4, // 内側の余白
          borderRadius: 2, // 角の丸み
          maxWidth: 400, // 最大幅
          width: '90%', // 横幅
          textAlign: 'center', // 中央揃え
        }}
      >
        <Typography variant="h4" mb={2}>新規登録</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          label="メールアドレス"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="ユーザー名"
          type="text"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <TextField
          label="パスワード確認"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          fullWidth
        />

        <Box mt={3}>
          <NavigationButton label="新規登録" variant='contained' to="#" onClick={handleSubmit} />
        </Box>
      </Paper>
      <Box mt={2}>
        <NavigationButton label="ログイン" to="/login" />
      </Box>
      <Box mt={2}>
        <NavigationButton label="トップページへ" to="/" />
      </Box>
    </Box>
  );
};

export default SignupForm;
