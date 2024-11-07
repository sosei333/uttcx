import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

export const menuItems = [
    { text: 'Home', link: './home', icon: <HomeIcon /> },
    { text: 'Explore', link: './explore', icon: <SearchIcon /> },
    { text: 'Communities', link: './communities', icon: <GroupIcon /> },
    { text: 'Settings', link: './settings', icon: <SettingsIcon /> },
    { text: 'Profile', link: './profile', icon: <PersonIcon /> },
];
