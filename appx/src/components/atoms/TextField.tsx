import { TextField as MuiTextField } from '@mui/material';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  minRows?: number;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, multiline = false, minRows }) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      minRows={minRows}
      margin="dense"
    />
  );
};

export default TextField;
