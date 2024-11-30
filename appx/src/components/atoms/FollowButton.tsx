import React, { useState } from 'react';
import { Button } from '@mui/material';
import { addFollow, removeFollow } from '../../services/follow';

interface FollowButtonProps {
    userId: string; // フォロー対象のユーザーID
    isInitiallyFollowing?: boolean; // 初期のフォロー状態
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isInitiallyFollowing = false }) => {
    const [isFollowing, setFollowing] = useState(isInitiallyFollowing);

    const handleFollowClick = async () => {
        try {
            if (isFollowing) {
                // フォロー解除処理
                await removeFollow(userId);
                setFollowing(false);
            } else {
                // フォロー追加処理
                await addFollow(userId);
                setFollowing(true);
            }
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };

    return (
        <Button
            variant={isFollowing ? 'contained' : 'outlined'}
            color="primary"
            onClick={handleFollowClick}
        >
            {isFollowing ? 'Following' : 'Follow'}
        </Button>
    );
};

export default FollowButton;
