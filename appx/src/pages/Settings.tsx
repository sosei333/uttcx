import React from 'react';
import { Box } from '@mui/material';
import SettingsComponent from '../components/organisms/SettingsBox';

const Settings: React.FC = () => {
    return (
        <Box
            sx={{
                border: '2px dashed #000', // 黒い2pxの枠線
                borderRadius: '8px', // 角を丸くする
                padding: 2, // 内側の余白
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
            }}
        >
            <SettingsComponent />
        </Box>
    );
};

export default Settings;

