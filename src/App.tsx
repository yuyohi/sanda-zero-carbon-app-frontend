import { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import MainMenu from './containers/main-menu/mainMenu';
import FixedBottomNavigation from './components/navigationBar';
import LoginPage from './containers/login/loginPage';
import SignUpPage from './containers/login/signUpPage';
import theme from './theme/theme';
import MissionView from './components/mission/MissionView';
import LookbackView from './components/lookback/LookbackView';
import QuizView from './components/quiz/QuizView';

const App: FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
          <FixedBottomNavigation />
        </Box>
        <Routes>
          <Route path="/" element={<Navigate to="login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/lookback" element={<LookbackView />} />
          <Route path="/menu" element={<MainMenu />} />
          <Route path="/mission" element={<MissionView />} />
          <Route path="/quiz" element={<QuizView />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
