import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {colors} from '../../layouts/colors';

interface ViewDetailsButtonProps {
    onClick: () => void;
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ onClick }) => {
    const theme=useTheme();
    return (
        <IconButton aria-label="view details" onClick={onClick}>
            <VisibilityIcon sx={{
                color: theme.palette.secondary.main,
            }} />
        </IconButton>
    );
};

export default ViewDetailsButton;
