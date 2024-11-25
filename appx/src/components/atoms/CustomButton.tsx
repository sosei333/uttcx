import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import colors from '../../layouts/colors';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.accent, // 任意の背景色
  color: '#FFFFFF', // テキストカラー
  '&:hover': {
    backgroundColor: '#5F8F91', // ホバー時の背景色
  },
}));

export default CustomButton;
