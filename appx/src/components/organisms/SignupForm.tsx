import React, { useState } from 'react';
import { TextField, Box, Typography, Alert } from '@mui/material';
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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" mb={2}>新規登録</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
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

      {/* NavigationButtonを利用 */}
      <NavigationButton label="新規登録" to="#" onClick={handleSubmit} />
      <NavigationButton label="ログイン" to="/login" />
      <NavigationButton label="トップページに戻る" to="/" />
    </Box>
  );
};

export default SignupForm;
