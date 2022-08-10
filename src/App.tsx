import { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Box, ThemeProvider } from '@mui/material';
import MainMenu from './components/main-menu/mainMenu';
import FixedBottomNavigation from './components/navigationBar';
import LoginPage from './containers/login/loginPage';
import SignUpPage from './containers/login/signUpPage';
import theme from './theme/theme';

const App: FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
          <FixedBottomNavigation />
        </Box>
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="menu" element={<MainMenu />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
