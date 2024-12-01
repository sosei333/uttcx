import React from 'react';
import useSignOut from '../../hooks/useSignOut';
import { Button } from "@mui/material";

const SignOutButton: React.FC = () => {
    const handleSignOut = useSignOut();
    return (
        <Button variant="contained" color='secondary' onClick={handleSignOut} fullWidth 
        sx={{ alignSelf: 'center',}}>
            ログアウト
        </Button>
    );
}

export default SignOutButton;