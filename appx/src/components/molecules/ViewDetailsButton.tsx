import React from 'react';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {colors} from '../../layouts/colors';

interface ViewDetailsButtonProps {
    onClick: () => void;
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ onClick }) => {
    return (
        <IconButton aria-label="view details" onClick={onClick}>
            <VisibilityIcon sx={{
                color: colors.accent,
            }} />
        </IconButton>
    );
};

export default ViewDetailsButton;
