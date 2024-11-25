import React from 'react';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ViewDetailsButtonProps {
    onClick: () => void;
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ onClick }) => {
    return (
        <IconButton aria-label="view details" onClick={onClick}>
            <VisibilityIcon color="primary" />
        </IconButton>
    );
};

export default ViewDetailsButton;
