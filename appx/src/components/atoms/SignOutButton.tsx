import React from 'react';
import useSignOut from '../../hooks/useSignOut';
import { Button } from "@mui/material";
import {colors}from '../../layouts/colors';

const SignOutButton: React.FC = () => {
    const handleSignOut = useSignOut();
    return (
        <Button variant="contained" onClick={handleSignOut} fullWidth sx={{color:colors.background, backgroundColor:colors.accent}}>
            ログアウト
        </Button>
    );
}

export default SignOutButton;