import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate} from 'react-router-dom';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError('パスワードが一致しません。');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('新規登録が成功しました。ログインしてください。');
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
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
            <Button variant="contained" color="primary" onClick={handleSignup} fullWidth>
                新規登録
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleBackToHome} fullWidth sx={{ mt: 2 }}>
                トップページに戻る
            </Button>
        </Box>
    );
};

export default Signup;
