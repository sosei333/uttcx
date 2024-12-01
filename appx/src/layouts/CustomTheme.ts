import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const customTheme = createTheme({
    palette: {
        primary: {
            main: colors.accent, // プライマリカラー
        },
        secondary: {
            main: colors.text, // セカンダリカラー
        },
        error: {
            main: '#d32f2f', // エラーカラー
        },
        warning: {
            main: '#ffa726', // 警告カラー
        },
        info: {
            main: '#0288d1', // 情報カラー
        },
        success: {
            main: '#2e7d32', // 成功カラー
        },
        background: {
            default: colors.background, // 背景のデフォルトカラー
            paper: '#ffffff', // カードやダイアログの背景
        },
        text: {
            primary: colors.text, // テキストのプライマリカラー
            secondary: '#555555', // テキストのセカンダリカラー
        },
    },
});

export default customTheme;
