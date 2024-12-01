import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, green } from '@mui/material/colors';
import MyApp from './MyApp'; // アプリ本体のコンポーネント
import { colors } from './layouts/colors';
import customTheme from './layouts/CustomTheme';

// // カスタムテーマを作成
// const customTheme = createTheme({
//     palette: {
//         primary: {
//             main: colors.accent, // プライマリカラーを青に設定
//         },
//         secondary: {
//             main: green[500], // セカンダリカラーを緑に設定
//         },
//     },
//     typography: {
//         fontFamily: `'Roboto', 'Arial', sans-serif`, // フォントのカスタマイズ
//     },
// });

const App: React.FC = () => {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline /> {/* グローバルリセット */}
            <MyApp />
        </ThemeProvider>
    );
};

export default App;
