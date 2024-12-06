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

// ローカルストレージからテーマを取得
const getThemeFromLocalStorage = (): string => {
  return localStorage.getItem('settings.theme') || 'default'; // 見つからない場合は 'default'
};

// ローカルストレージからフォントサイズを取得
const getFontSizeFromLocalStorage = (): number => {
  const fontSize = localStorage.getItem('settings.fontSize');
  switch (fontSize) {
    case 'small':
      return 12; // 小さいフォントサイズ
    case 'medium':
      return 16; // デフォルトのフォントサイズ
    case 'large':
      return 20; // 大きいフォントサイズ
    default:
      return 16; // デフォルト
  }
};

// カスタムテーマ作成
const createCustomTheme = () => {
  const themeName = getThemeFromLocalStorage(); // ローカルストレージからテーマ取得
  const themeNumber = themeMap[themeName] || themeMap['default']; // テーマ番号取得（デフォルト対応）
  const colors = getColorSet(themeNumber); // テーマ番号に基づいてカラーパレット取得
  const fontSize = getFontSizeFromLocalStorage(); // フォントサイズ取得

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
    typography: {
      fontFamily: "'Nunito', 'Roboto', sans-serif", // 丸みのあるフォントをグローバルに設定
      fontSize: fontSize, // 動的にフォントサイズを設定
      h1: {
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        fontSize: fontSize * 2, // 基本フォントサイズを基に計算
      },
      h2: {
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 600,
        fontSize: fontSize * 1.5,
      },
      body1: {
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 400,
        fontSize: fontSize, // 基本フォントサイズ
      },
      button: {
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 500,
        fontSize: fontSize * 0.9, // ボタンのフォントサイズを少し小さく
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
