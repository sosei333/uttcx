import React from 'react';
import { Button } from '@mui/material';
import useSignOut from '../../hooks/useSignOut';

const SignOutButton: React.FC = () => {
    const handleSignOut = useSignOut();

    return (
        <Button variant="outlined" onClick={handleSignOut} color="error" fullWidth>
            ログアウト
        </Button>
    );
};

export default SignOutButton;
