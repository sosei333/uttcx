// pages/Signup.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { handleLogin, error, success } = useLogin();
    const navigate = useNavigate();

    return (
        <LoginForm
            onLogin={handleLogin}
            error={error}
            success={success}
        />
    );
};

export default Login;
