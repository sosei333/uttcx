import React from 'react';
import useSignOut from '../../hooks/useSignOut';
import { Button } from "@mui/material";
import { getLocalizedStrings } from '../../layouts/strings';
import { useLanguage } from '../../layouts/LanguageContext';

const SignOutButton: React.FC = () => {
    const { language } = useLanguage(); // 言語設定を取得
    const strings = getLocalizedStrings(language); // 言語に基づく文字列を取得
    const handleSignOut = useSignOut();
    return (
        <Button variant="contained" color='secondary' onClick={handleSignOut} fullWidth 
        sx={{ alignSelf: 'center',maxWidth:'10vw'}}>
            {strings.logout}
        </Button>
    );
}

export default SignOutButton;