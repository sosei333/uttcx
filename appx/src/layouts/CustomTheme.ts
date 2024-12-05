import { createTheme } from '@mui/material/styles';
//import { colors } from './colors';
import { getColorSet } from './colors';
import { getUserSettings } from '../services/user';

const colors=getColorSet(3)

const customTheme = createTheme({
  palette: {
    primary: {
      main: colors.accent,        // プライマリカラーにアクセントカラーを使用
      light: colors.accentLight, // 明るいバリエーション
      dark: colors.accentDark,   // 暗いバリエーション
    },
    secondary: {
      main: colors.text,         // セカンダリカラーにテキストカラーを使用
    },
    background: {
      default: colors.base,      // 全体の背景色
      paper: '#ffffff',          // Paperなどのコンポーネント背景色
    },
    text: {
      primary: colors.text,         // プライマリテキストカラー
      secondary: colors.textSecondary, // セカンダリテキストカラー
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: colors.text,       // デフォルトの文字色
          '&:hover': {
            backgroundColor: colors.accentLight, // 未選択時のホバー色
          },
          '&.Mui-selected': {
            backgroundColor: colors.accent, // 選択時の背景色
            color: '#ffffff',               // 選択時の文字色
            '&:hover': {
              backgroundColor: colors.accent, // 選択状態ではホバー時に色を変えない
            },
          },
        },
      },
    },
  },
});

export default customTheme;
