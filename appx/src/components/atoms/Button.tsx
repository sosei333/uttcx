import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success';
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, color = 'primary', disabled = false, children }) => {
  return (
    <MuiButton onClick={onClick} color={color} disabled={disabled} variant="contained">
      {children}
    </MuiButton>
  );
};

export default Button;
