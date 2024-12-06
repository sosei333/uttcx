import { createTheme } from '@mui/material/styles';
import { getColorSet } from './colors';

// テーマ名と番号のマッピング
const themeMap: Record<string, number> = {
  light: 3,
  dark: 2,
  blue: 4,
  green: 1,
  default: 1, // デフォルトテーマ
};

const getThemeFromLocalStorage = (): string => {
  return localStorage.getItem('settings.theme') || 'default'; // 見つからない場合は 'default'
};

const createCustomTheme = () => {
  const themeName = getThemeFromLocalStorage(); // ローカルストレージからテーマ取得
  const themeNumber = themeMap[themeName] || themeMap['default']; // テーマ番号取得（デフォルト対応）
  const colors = getColorSet(themeNumber); // テーマ番号に基づいてカラーパレット取得

  return createTheme({
    palette: {
      primary: {
        main: colors.accent,
        light: colors.accentLight,
        dark: colors.accentDark,
      },
      secondary: {
        main: colors.text,
      },
      background: {
        default: colors.base,
        paper: '#ffffff',
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
    },
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: colors.text,
            '&:hover': {
              backgroundColor: colors.accentLight,
            },
            '&.Mui-selected': {
              backgroundColor: colors.accent,
              color: '#ffffff',
              '&:hover': {
                backgroundColor: colors.accent,
              },
            },
          },
        },
      },
    },
  });
};

export default createCustomTheme;
