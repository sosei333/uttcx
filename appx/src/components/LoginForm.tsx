// components/SignupForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

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
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
                新規登録
            </Button>
        </Box>
    );
};

export default LoginForm;
