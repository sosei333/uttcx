import React from 'react';
import useSignOut from '../../hooks/useSignOut';
import { Button } from "@mui/material";
import { useAppContext } from '../../context/AppContext';
import { getLocalizedStrings } from '../../layouts/strings';

const SignOutButton: React.FC = () => {
    const strings = getLocalizedStrings();
   
    const handleSignOut = useSignOut();
    return (
        <Button variant="contained" color='secondary' onClick={handleSignOut} fullWidth 
        sx={{ alignSelf: 'center',maxWidth:'90%'}}>
            {strings.logout}
        </Button>
    );
}

export default SignOutButton;