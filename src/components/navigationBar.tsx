import { FC } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import RestoreIcon from '@mui/icons-material/Restore';

const FixedBottomNavigation: FC = () => (
  <Box>
    <BottomNavigation>
      <BottomNavigationAction label="ミッション" icon={<RestoreIcon />} />
      <BottomNavigationAction label="振り返り" icon={<RestoreIcon />} />
      <BottomNavigationAction label="ホーム" icon={<RestoreIcon />} />
      <BottomNavigationAction label="クイズ" icon={<RestoreIcon />} />
      <BottomNavigationAction label="バッジ" icon={<RestoreIcon />} />
    </BottomNavigation>
  </Box>
);

export default FixedBottomNavigation;
