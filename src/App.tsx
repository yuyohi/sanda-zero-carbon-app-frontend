import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import { Box, ThemeProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MainMenu from './components/main-menu/mainMenu';
// import FixedBottomNavigation from './components/navigationBar';
import theme from './theme/theme';
import MissionView from './components/misson/MissionView';

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/mission" element={<MissionView />} />
          {/* <Route path="/lookback" element={<MissionView />} /> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>
);

export default App;
