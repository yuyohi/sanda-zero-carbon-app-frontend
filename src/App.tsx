import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import MainMenu from './components/main-menu/mainMenu';
import FixedBottomNavigation from './components/navigationBar';
import theme from './theme/theme';
import MissionView from './components/misson/MissionView';
import LookbackView from './components/lookback/LookbackView';

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
      <FixedBottomNavigation />
    </Box>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/mission" element={<MissionView />} />
          {/* <Route path="/lookback" element={<MissionView />} /> */}
          <Route path="/lookback" element={<LookbackView />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
