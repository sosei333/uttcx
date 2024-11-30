import React, { useState } from 'react';
import { TextField, Box, Typography, Alert } from '@mui/material';
import NavigationButton from '../atoms/NavigationButton';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  error: string | null;
  success: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error, success }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onLogin(email, password);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" mb={2}>ログイン</Typography>
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
        label="パスワード"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      <NavigationButton label="ログイン" to="#" onClick={handleSubmit} />
      <NavigationButton label="新規登録" to="/signup" />
      <NavigationButton label="トップページに戻る" to="/" />
    </Box>
  );
};

export default LoginForm;
