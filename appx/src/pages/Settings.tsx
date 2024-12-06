import React from 'react';
import { Box } from '@mui/material';
import SettingsComponent from '../components/organisms/SettingsBox';

const Settings: React.FC = () => {
    return (
        <Box
            sx={{
                borderRadius: '8px', // 角を丸くする
                padding: 2, // 内側の余白
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: '80vh'
            }}
        >
            <SettingsComponent />
        </Box>
    );
};

export default Settings;

