import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';

const FixedBottomNavigation: FC = () => (
  <Box>
    <BottomNavigation>
      <BottomNavigationAction label="ミッション" />
      <BottomNavigationAction label="振り返り" />
      <BottomNavigationAction label="ホーム" />
      <BottomNavigationAction label="クイズ" />
      <BottomNavigationAction label="バッジ" />
    </BottomNavigation>
  </Box>
);

export default FixedBottomNavigation;
