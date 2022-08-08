import { FC } from 'react';
import Box from '@mui/material/Box';
import MainMenu from './components/main-menu/mainMenu';
import FixedBottomNavigation from './components/navigationBar';

const App: FC = () => (
  <>
    <MainMenu />
    <Box sx={{ position: 'fixed', left: 0, right: 0, bottom: 0 }}>
      <FixedBottomNavigation />
    </Box>
  </>
);

export default App;
