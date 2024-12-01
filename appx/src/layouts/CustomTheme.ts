import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const customTheme = createTheme({
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    // デフォルトのスタイル
                    flex: 1,
                    color: colors.text,
                    '&:hover': {
                        backgroundColor: colors.accentLight, // 未選択時のホバー色
                    },
                    '&.Mui-selected': {
                        backgroundColor: colors.accent, // 選択時の背景色
                        color: '#ffffff', // 選択時のテキスト色
                        '&:hover': {
                            backgroundColor: colors.accent, // 選択時にホバーしても色を変えない
                        },
                    },
                },
            },
        },
    },
    palette: {
        primary: {
            main: colors.accent,
        },
        background: {
            default: colors.background,
            paper: '#ffffff',
        },
        text: {
            primary: colors.text,
        },
    },
});

export default customTheme;
