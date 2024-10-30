import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../App.css';
import RootLayout from "./Rootlayout";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const Contents: React.FC = () => {
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
            <RootLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </RootLayout>
            <div>
                <h1>ログイン済みのコンテンツ</h1>
                {/* ログインしているユーザーの情報を表示 */}
                <p>こんにちは、{auth.currentUser?.email}さん</p>
                <Button variant="contained" color="primary" onClick={handleSignOut} fullWidth sx={{ mt: 2 }}>
                    ログアウト
                </Button>
            </div>
        </Box>
    );
};

export default Contents;
