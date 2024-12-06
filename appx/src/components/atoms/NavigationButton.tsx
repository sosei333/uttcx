import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
  label: string; // ボタンのラベル
  to: string; // 遷移先
  onClick?: () => void; // オプションのクリックイベント
  variant?: 'text' | 'outlined' | 'contained'; // ボタンのスタイル
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; // カラーバリエーション
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  label,
  to,
  onClick,
  variant = 'outlined', // デフォルト値を指定
  color = 'primary', // デフォルトの色
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (onClick) onClick(); // クリックイベントが渡されている場合に実行
    if (to !== '#') navigate(to); // 遷移先が指定されていればナビゲート
  };

  return (
    <Button
      fullWidth
      onClick={handleNavigation}
      color={color}
      variant={variant}
      sx={{
        minWidth: 120,
        maxWidth: 150,
        my: '8px',
        mx: '4px'
      }}
    >
      {label}
    </Button>
  );
};

export default NavigationButton;
