import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../layouts/colors';

interface NavigationButtonProps {
  label: string; // ボタンのラベル
  to: string; // 遷移先
  onClick?: () => void; // オプションのクリックイベント
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ label, to, onClick }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (onClick) onClick(); // クリックイベントが渡されている場合に実行
    if (to !== '#') navigate(to); // 遷移先が指定されていればナビゲート
  };

  return (
    <Button
      fullWidth
      onClick={handleNavigation}
      sx={{
        minWidth: 120,
        m: '10px',
        color: colors.background,
        backgroundColor: colors.accent,
        "&:hover": {
          color: colors.accent,
          backgroundColor: colors.background,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default NavigationButton;
