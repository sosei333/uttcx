import React, { useState } from 'react';
import { addFollow, removeFollow } from '../../services/follow';
import ToggleButton from './ToggleButton';

interface FollowButtonProps {
    userId: string; // フォロー対象のユーザーID
    isInitiallyFollowing?: boolean; // 初期のフォロー状態
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isInitiallyFollowing = false }) => {
    const [isFollowing, setFollowing] = useState(isInitiallyFollowing);

    const handleToggleFollow = async () => {
        try {
            if (isFollowing) {
                await removeFollow(userId);
            } else {
                await addFollow(userId);
            }
            setFollowing(!isFollowing); // 状態を反転
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };

    return (
        <ToggleButton
            isActive={isFollowing}
            onToggle={handleToggleFollow}
            activeText="Following"
            inactiveText="Follow"
        />
    );
};

export default FollowButton;