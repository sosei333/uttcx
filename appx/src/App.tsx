import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import Explore from './pages/Explore';
import Home from './pages/Home';
import TweetDetails from './pages/TweetDetails';
import Profile from './pages/Profile';

import { Box, Typography, Button, CircularProgress } from '@mui/material';


const Title: React.FC = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" mb={2} sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Twitter
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        あなたのソーシャルメディアの出発点
      </Typography>
    </Box>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" ml={2}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Router>
      <MainContent user={user} />
    </Router>
  );
};

const MainContent: React.FC<{ user: User | null }> = ({ user }) => {
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        flexGrow: 1, // 高さを画面全体に拡張
        width: '100%', // 幅を全体に拡張
        bgcolor: 'background.default',
        padding: 3,
      }}
    >
      <Routes>
        {/* ログイン前のルート */}
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ログイン状態でアクセスしようとした場合、リダイレクト */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // ログイン後のルート（RootLayoutでラップ）
          <Route element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tweet/:id" element={<TweetDetails />} />
            {/* ログイン前のページに戻らないようリダイレクト */}
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route path="/signup" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        )}
      </Routes>

      {/* ログイン前のメニュー表示 */}
      {!user && !['/login', '/signup'].includes(location.pathname) && (
        <Box mt={4} textAlign="center">
          <Title />
          <Box mt={2}>
            <Link to="/login" style={{ marginRight: 16, textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ minWidth: 120 }}>
                ログイン
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="primary" sx={{ minWidth: 120 }}>
                アカウントを作成
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};


export default App;
