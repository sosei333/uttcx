import React from 'react';
import useSignOut from '../../hooks/useSignOut';
import { Button } from "@mui/material";
import {colors}from '../../layouts/colors';

const SignOutButton: React.FC = () => {
    const handleSignOut = useSignOut();
    return (
        <Button variant="contained" onClick={handleSignOut} fullWidth 
        sx={{ alignSelf: 'center',
            color:colors.background,
            backgroundColor:colors.accent,
            "&:hover": {
                color:colors.accent,
                backgroundColor: colors.background, // ホバー時の背景色
            },
        }}>
            ログアウト
        </Button>
    );
}

export default SignOutButton;