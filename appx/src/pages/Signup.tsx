// pages/Signup.tsx
import React from 'react';
import SignupForm from '../components/SignupForm';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const { handleSignup, error, success } = useSignup();

    return (
        <SignupForm
            onSignup={handleSignup}
            error={error}
            success={success}
        />
    );
};

export default Signup;
