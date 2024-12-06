// App.tsx
import React from 'react';
import { AppProvider } from './context/AppContext';
import MyApp from './MyApp';
import { ThemeProvider } from '@emotion/react';
import customTheme from './layouts/CustomTheme';
import { CssBaseline } from '@mui/material';

const App = () => (
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <AppProvider>
      <MyApp />
    </AppProvider>
  </ThemeProvider>
);

export default App;
