import React, { useState } from 'react';
import { addFollow, removeFollow } from '../../services/follow';
import ToggleButton from './ToggleButton';
import { getLocalizedStrings } from '../../layouts/strings';
import { useLanguage } from '../../layouts/LanguageContext';

interface FollowButtonProps {
    userId: string; // フォロー対象のユーザーID
    isInitiallyFollowing?: boolean; // 初期のフォロー状態
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isInitiallyFollowing = false }) => {
    const [isFollowing, setFollowing] = useState(isInitiallyFollowing);
    const { language } = useLanguage(); // 言語設定を取得
    const strings = getLocalizedStrings(language); // 言語に基づく文字列を取得

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
            activeText={strings.following}
            inactiveText={strings.follow}
        />
    );
};

export default FollowButton;
