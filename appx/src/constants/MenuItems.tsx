import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { getLocalizedStrings } from '../layouts/strings';

const messages = getLocalizedStrings();

export const menuItems = [
    { text: messages.home, link: './home', icon: <HomeIcon /> },
    //{ text: 'Explore', link: './explore', icon: <SearchIcon /> },
    { text: messages.follow2, link: './follow', icon: <GroupIcon /> },
    { text: messages.setting, link: './settings', icon: <SettingsIcon /> },
    { text: messages.profile, link: './profile', icon: <PersonIcon /> },
];
