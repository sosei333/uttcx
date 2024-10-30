import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const auth = getAuth();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/contents')
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" mb={2}>ログイン</Typography>
            {error && <Alert severity="error">{error}</Alert>}
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
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                ログイン
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleBackToHome} fullWidth sx={{ mt: 2 }}>
                トップページに戻る
            </Button>
        </Box>
    );
};

export default Login;