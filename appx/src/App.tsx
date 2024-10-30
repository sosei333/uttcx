import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Signup from './components/Signup';
import Rootlayout from './components/Rootlayout';
import Contents from './components/Contents';
import { Box, Typography, Button } from '@mui/material';

const HomeHome: React.FC = () => { //未使用
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <Box textAlign="center">
      <Typography variant="h4" mb={2}>Twitter</Typography>
      <Typography variant="h6">ようこそ, {auth.currentUser?.email} さん</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginTop: '16px' }}>
        ログアウト
      </Button>
      <Box mt={2}>
        <Link to="/contents">
          <Button variant="contained" color="primary">コンテンツページへ</Button>
        </Link>
      </Box>
    </Box>
  );
};

const Home: React.FC = () => {

  return (
    <Box textAlign="center">
      <Typography variant="h4" mb={2}>Twitter</Typography>
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
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Router>
      <MainContent user={user} />
    </Router>
  );
};

// <Router> の中で useLocation を使うために MainContent コンポーネントを分離
const MainContent: React.FC<{ user: User | null }> = ({ user }) => {
  const location = useLocation();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contents" element={user ? <Contents /> : <Navigate to="/login" />} />
      </Routes>
      <Box mt={2}>
        {!user && !['/login', '/signup'].includes(location.pathname) && (
          <>
            <Home></Home>
            <Link to="/login" style={{ marginRight: 16 }}>
              <Button variant="contained" color="primary">ログイン</Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained" color="primary">新規登録</Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default App;