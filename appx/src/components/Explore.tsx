// Contact.tsx

import { signOut } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from "../firebase";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../App.css';


const Explore: React.FC = () => {
    const [keyWord, setKeyWord] = useState('');

    return (
        <Box 
        display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" height="20vh" width="60vw"
        sx={{
            border: '2px dashed #000', // 黒い2pxの枠線
            borderRadius: '8px', // 角を丸くする
            padding: 2, // 内側の余白
        }}>
            <Typography variant="h4" mb={2}>検索</Typography>
            <TextField
                label="キーワード"
                variant="outlined"
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                margin="normal"
                fullWidth
            />
        </Box>
    )
};

export default Explore;
