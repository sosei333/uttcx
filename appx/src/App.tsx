import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import Explore from './pages/Explore';
import Home from './pages/Home';
import FollowingList from './pages/Follow';
import Profile from './pages/Profile';
import { Box, Typography, CircularProgress } from '@mui/material';
import TweetAndReplies from './pages/TweetAndReplies';

import NavigationButton from './components/atoms/NavigationButton';

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
        flexGrow: 1,
        width: '100%',
        bgcolor: 'background.default',
        padding: 0,
      }}
    >
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/follow" element={<FollowingList />} />
            <Route path="/tweet/:id" element={<TweetAndReplies />} />
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route path="/signup" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        )}
      </Routes>

      {!user && !['/login', '/signup'].includes(location.pathname) && (
        <Box mt={4} textAlign="center" alignItems="center" alignContent="center">
          <Title />
          <Box mt={2}>
            <NavigationButton label="ログイン" to="/login" />
            <NavigationButton label="新規登録" to="/signup" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default App;
