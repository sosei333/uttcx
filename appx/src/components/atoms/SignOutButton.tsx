import React from 'react';
import useSignOut from '../../hooks/useSignOut';
import CustomButton from './CustomButton';

const SignOutButton: React.FC = () => {
    const handleSignOut = useSignOut();

    return (
        <CustomButton variant="contained" onClick={handleSignOut} color="secondary" fullWidth>
            ログアウト
        </CustomButton>
    );
};

export default SignOutButton;
