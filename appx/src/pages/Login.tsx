// pages/Signup.tsx
import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
    const { handleLogin, error, success } = useLogin();

    return (
        <LoginForm
            onLogin={handleLogin}
            error={error}
            success={success}
        />
    );
};

export default Login;
