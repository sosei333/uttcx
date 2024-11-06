// components/SignupForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

interface SignupFormProps {
    onSignup: (email: string, password: string, confirmPassword: string) => void;
    error: string | null;
    success: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, error, success }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        onSignup(email, password, confirmPassword);
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
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
                新規登録
            </Button>
        </Box>
    );
};

export default SignupForm;
