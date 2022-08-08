/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import MissionView from './components/misson/MissionView';
import theme from './theme/theme';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MissionView />
    </ThemeProvider>
  );
};

export default App;
