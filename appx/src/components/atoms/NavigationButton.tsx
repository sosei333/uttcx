import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      color='primary'
      variant='outlined'
      sx={{
        minWidth: 120,
        maxWidth: 150,
        m:'2px'
      }}
    >
      {label}
    </Button>
  );
};

export default NavigationButton;
