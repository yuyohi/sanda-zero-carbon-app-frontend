import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Box, ThemeProvider } from '@mui/material';
import MainMenu from './components/main-menu/mainMenu';
import FixedBottomNavigation from './components/navigationBar';
import theme from './theme/theme';

const App: FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
          <FixedBottomNavigation />
        </Box>
        <Routes>
          <Route path="/" element={<MainMenu />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
