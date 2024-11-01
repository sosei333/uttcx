import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../App.css';
import RootLayout from "./RootLayout";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home1 from './Home1';
import About from './About';
import Contact from './Explore';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            alert("ログアウトしました");
            navigate('/');
        }).catch(error => {
            alert("ログアウトに失敗しました: " + error.message);
        });
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="70vh">
            <div>
                <h1>ログイン済みのコンテンツ</h1>
                {/* ログインしているユーザーの情報を表示 */}
                <p>こんにちは、{auth.currentUser?.email}さん</p>
            </div>
        </Box>
    );
};

export default Home;
