import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Box from '@mui/material/Box';
import MainMenu from './components/main-menu/mainMenu';
import FixedBottomNavigation from './components/navigationBar';

const App: FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
      </Routes>
      <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
        <FixedBottomNavigation />
      </Box>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
