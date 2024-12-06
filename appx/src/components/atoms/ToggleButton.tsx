import React from 'react';
import { Button } from '@mui/material';

interface ToggleButtonProps {
    isActive: boolean; // 現在の状態
    onToggle: () => void; // 状態を切り替える関数
    activeText?: string; // アクティブ状態のボタンテキスト
    inactiveText?: string; // 非アクティブ状態のボタンテキスト
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    isActive,
    onToggle,
    activeText = 'Active',
    inactiveText = 'Inactive',
}) => {
    return (
        <Button
            variant={isActive ? 'contained' : 'outlined'}
            color="primary"
            onClick={onToggle}
            sx={{maxWidth:'120px', height:'36px', alignSelf:"center"}}
        >
            {isActive ? activeText : inactiveText}
        </Button>
    );
};

export default ToggleButton;