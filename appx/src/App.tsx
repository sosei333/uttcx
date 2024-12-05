import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, green } from '@mui/material/colors';
import MyApp from './MyApp'; // アプリ本体のコンポーネント
import customTheme from './layouts/CustomTheme';
import { LanguageProvider } from "./layouts/LanguageContext";



const App: React.FC = () => {
    return (
        <LanguageProvider>
        <ThemeProvider theme={customTheme}>
            <CssBaseline /> {/* グローバルリセット */}
            <MyApp />
        </ThemeProvider>
        </LanguageProvider>
    );
};

export default App;
