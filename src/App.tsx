import { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import ProtectRoute from './auth/protectRoute';
import MainMenu from './containers/main-menu/mainMenu';
import LoginPage from './containers/login/loginPage';
import SignUpPage from './containers/login/signUpPage';
import theme from './theme/theme';
import MissionView from './components/mission/MissionView';
import LookbackView from './components/lookback/LookbackView';
import QuizView from './components/quiz/QuizView';

const queryClient = new QueryClient();

const App: FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="menu" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/lookback"
              element={
                <ProtectRoute>
                  <LookbackView />
                </ProtectRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <ProtectRoute>
                  <MainMenu />
                </ProtectRoute>
              }
            />
            <Route
              path="/mission"
              element={
                <ProtectRoute>
                  <MissionView />
                </ProtectRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectRoute>
                  <QuizView />
                </ProtectRoute>
              }
            />
          </Routes>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
