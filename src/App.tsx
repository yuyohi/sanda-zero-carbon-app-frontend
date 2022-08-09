import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material';
import MainMenu from './components/main-menu/mainMenu';
import theme from './theme/theme';
import MissionView from './components/misson/MissionView';

const App: FC = () => (
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/mission" element={<MissionView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
